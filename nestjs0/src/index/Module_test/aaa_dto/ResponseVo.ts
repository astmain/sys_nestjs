// src/dto/response.dto.ts
import { ApiExtraModels, getSchemaPath } from '@nestjs/swagger'

/**
 * 统一响应格式
 */
export class ResponseVo<T = any> {
  code: number
  message: string
  data?: T

  /**
   * 成功响应
   */
  static success<T>(data: T, message = 'OK'): ResponseVo<T> {
    return { code: 200, message, data }
  }

  /**
   * 失败响应
   */
  static fail(code: number, message: string): ResponseVo<null> {
    return { code, message, data: null }
  }
}
