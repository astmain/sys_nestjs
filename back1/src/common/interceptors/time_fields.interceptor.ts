import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { PROCESS_TIME_FIELDS_KEY } from '../decorators/process_time_fields.decorator'
import { PrismaService } from '../../prisma/prisma.service'

@Injectable()
export class TimeFieldsInterceptor implements NestInterceptor {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const shouldProcessTimeFields = this.reflector.getAllAndOverride<boolean>(
      PROCESS_TIME_FIELDS_KEY,
      [context.getHandler(), context.getClass()],
    )

    if (!shouldProcessTimeFields) {
      return next.handle()
    }

    return next.handle().pipe(
      map((data) => {
        // 处理时间字段转换
        const processedData = this.prisma.processTimeFields(data)
        
        // 如果是 Promise，需要特殊处理
        if (data instanceof Promise) {
          return data.then((result) => this.prisma.processTimeFields(result))
        }
        
        return processedData
      }),
    )
  }
}
