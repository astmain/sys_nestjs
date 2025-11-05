import { getSchemaPath } from '@nestjs/swagger'
import { ResponseVo } from './ResponseVo'

/**
 * 带 $ref 支持的响应包装器（用于 Swagger）
 */
export const ResponseWrapper = <T>(_class: new () => T) => {
  return {
    schema: {
      allOf: [
        { $ref: getSchemaPath(ResponseVo) },
        {
          properties: {
            data: { $ref: getSchemaPath(_class) },
          },
        },
      ],
    },
  }
}
