import { Controller, Get } from '@nestjs/common'
import { ApiTags, ApiOkResponse, ApiProperty } from '@nestjs/swagger'
import * as yup from 'yup'
import { UseSchema, YupValidationPipe } from 'nestjs-yup'

// 定义分页对象 Schema
const pageObjSchema = yup.object({
  page: yup.number().integer().min(1).required().label('当前页码'),
  page_size: yup.number().integer().min(1).max(100).required().label('每页显示数量'),
})

// 业务数据结构 Schema
const resultDataSchema = yup.object({
  name_aaa2: yup.string().min(1).max(50).required().label('用户名称字段，用于标识用户身份'),
  name_bbb2: yup.string().min(1).max(50).required().label('用户名称字段B，用于存储用户昵称'),
  page_obj: pageObjSchema.required().label('分页对象'),
})

// 统一响应结构 Schema
const apiResponseSchema = yup.object({
  code: yup.number().integer().min(100).max(599).required().label('HTTP状态码，200表示成功，其他值表示错误'),
  msg: yup.string().min(1).required().label('操作结果的描述信息'),
  timestamp: yup
    .string()
    .matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/)
    .required()
    .label('服务器响应时间，ISO 8601格式'),
  result: resultDataSchema.required().label('具体的业务数据，包含用户相关信息'),
})

export class PageObjDto {
  @ApiProperty({
    description: '当前页码',
    example: 1,
    minimum: 1,
  })
  page: number

  @ApiProperty({
    description: '每页显示数量',
    example: 10,
    minimum: 1,
    maximum: 100,
  })
  page_size: number
}

export class ResultDataDto {
  @ApiProperty({
    description: '用户名称字段，用于标识用户身份',
    example: 'a222',
    minLength: 1,
    maxLength: 50,
  })
  name_aaa2: string

  @ApiProperty({
    description: '用户名称字段B，用于存储用户昵称',
    example: 'b222',
    minLength: 1,
    maxLength: 50,
  })
  name_bbb2: string

  @ApiProperty({
    description: '分页对象',
    type: PageObjDto,
    example: { page: 1, page_size: 10 },
  })
  page_obj: PageObjDto
}

export class ApiResponseDto {
  @ApiProperty({
    description: 'HTTP状态码，200表示成功，其他值表示错误',
    example: 200,
    minimum: 100,
    maximum: 599,
  })
  code: number

  @ApiProperty({
    description: '操作结果的描述信息',
    example: '操作成功',
    minLength: 1,
  })
  msg: string

  @ApiProperty({
    description: '服务器响应时间，ISO 8601格式',
    example: '2024-01-01T12:00:00.000Z',
  })
  timestamp: string

  @ApiProperty({
    description: '具体的业务数据，包含用户相关信息',
    type: ResultDataDto,
    example: {
      name_aaa2: 'a222',
      name_bbb2: 'b222',
      page_obj: { page: 1, page_size: 10 },
    },
  })
  result: ResultDataDto
}

@ApiTags('test5_demo5 - nestjs-yup 示例')
@Controller('test5_demo5')
export class test5_demo5 {
  @Get('one1')
  @ApiOkResponse({
    description: '基础测试功能',
    type: ApiResponseDto,
  })
  one1(): ApiResponseDto {
    return {
      code: 200,
      msg: '我成功了',
      result: {
        name_aaa2: 'a222',
        name_bbb2: 'b222',
        page_obj: { page: 1, page_size: 10 },
      },
      timestamp: new Date().toISOString(),
    }
  }
}
