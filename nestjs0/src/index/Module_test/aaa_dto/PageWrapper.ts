import { getSchemaPath } from '@nestjs/swagger'
import { ResponseVo } from './ResponseVo'
import { PageVo } from './PageVo'

// 在 page.dto.ts 末尾添加
export const PageWrapper = <T>(_class: new () => T) => {
    return {
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponseVo) },
          {
            properties: {
              data: {
                $ref: getSchemaPath(PageVo),
                properties: {
                  list: {
                    type: 'array',
                    items: { $ref: getSchemaPath(_class) },
                  },
                },
              },
            },
          },
        ],
      },
    };
  };