import { BadRequestException, ValidationError, ValidationPipe } from '@nestjs/common'
import { NestApplication } from '@nestjs/core'

// 拦截过滤器-dto验证
export async function filter_dto(app) {
  let aaa = new ValidationPipe({
    whitelist: true, // 删除 DTO 中未定义的属性
    forbidNonWhitelisted: true, // 若传入未定义属性，抛出错误
    transform: false, // 自动类型转换
    // exceptionFactory: (errors: ValidationError[]) => {
    exceptionFactory: (errors) => {
      let aaa = errors
      let errors_info = errors.flatMap((error) => {
        let values = Object.values(error.constraints || {})
        let result: any = []
        values.map((msg) => {
          // console.log(`222---msg:`, msg)
          // console.log(`222---error:`, error)
          result.push({ field: error.property, value: error.value, msg })
        })
        return result
      })

      // console.log(`333---err_arr:`, errors_info)
      let message = errors_info.map((o) => o.msg).join(';')
      const response = { code: 422, message: `失败:参数错误>${message}`, errors_info }
      return new BadRequestException(response)
    },
  })

  app.useGlobalPipes(aaa)
}
