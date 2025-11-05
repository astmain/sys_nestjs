import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { format_object_dates } from '../utils/date_formatter'

export interface Response<T> {
  success: boolean
  data: T
  message: string
  timestamp: string
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        // 格式化响应数据中的时间字段
        const formatted_data = format_object_dates(data)
        
        return {
          success: true,
          data: formatted_data,
          message: '操作成功',
          timestamp: new Date().toISOString(),
        }
      }),
    )
  }
}
