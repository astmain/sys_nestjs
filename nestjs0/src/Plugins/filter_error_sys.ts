import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common'
import { Response } from 'express'

@Catch()
export class my_filter_error_sys implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    let error_info = exception
    let msg = '服务器错误'

    if (exception instanceof HttpException) {
      const res = exception.getResponse()
      if (typeof res === 'string') {
        msg = res
        error_info = {}
      } else if (typeof res === 'object') {
        const raw_msg = (res as any).message
        msg = Array.isArray(raw_msg) ? '参数错误' : raw_msg || '参数错误'
        error_info = res
      }
    } else if (exception?.name?.includes('PrismaClientKnownRequestError')) {
      msg = '数据库-异常-prisma'
      error_info = exception.stack
      console.log(msg, exception)
    } else if (exception?.name?.includes('PrismaClientValidationError')) {
      msg = '数据库-参数错误-prisma'
      error_info = exception.stack
      console.log(msg, exception)
    } else {
      msg = '其他异常-' + exception.name
      error_info = exception.stack
      console.log(msg, exception)
    }

    response.status(400).json({ code: 400, msg, error_info })
  }
}

//配置:过滤器系统错误
export async function filter_error_sys(app: any) {
  app.useGlobalFilters(new my_filter_error_sys())
}
