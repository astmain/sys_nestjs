import { /*文档*/ ApiTags, ApiOperation, ApiOkResponse, ApiProperty, ApiBody, ApiExtraModels } from '@nestjs/swagger'
import { /*接口*/ Controller, Get, Inject, Body } from '@nestjs/common'
import { /*api开发*/ Api_public } from '@src/App_Auth'
import { /*数据库*/ db } from '@src/App_Prisma'
import { IsString, IsNumber, IsOptional, ValidateNested, validate } from 'class-validator'
import { Type, plainToClass } from 'class-transformer'

export class test5_dto4 {
  @ApiProperty({ description: '名称1', example: 'name_aaa2' })
  @IsString()
  name_aaa2: string = 'name_aaa2'

  @ApiProperty({ description: '名称2', example: 'name_bbb2' })
  @IsString()
  name_bbb2: string = 'name_bbb2'
}

// 简化的响应函数
export function VO<T>(dataType: new () => T) {
  const uniqueId = Math.random().toString(36).substr(2, 9)
  const responseClassName = `Response_${uniqueId}`

  class ResponseClass {
    @ApiProperty({ description: '状态码', example: 200 })
    @IsNumber()
    code: number

    @ApiProperty({ description: '响应消息', example: '操作成功' })
    @IsString()
    msg: string

    @ApiProperty({ description: '响应数据', type: dataType })
    @ValidateNested()
    @Type(() => dataType)
    result: T

    constructor(code: number = 200, msg: string = '操作成功', result: T = null as T) {
      this.code = code
      this.msg = msg
      this.result = result
    }
  }

  Object.defineProperty(ResponseClass, 'name', { value: responseClassName })
  return ResponseClass
}

// 数据校验工具类
// 数据校验工具类
export class ResultData {
  static async ok<T>(data: any, message: string = '操作成功', dataType?: new () => T) {
    // 如果提供了数据类型，进行校验
    if (dataType) {
      const instance = plainToClass(dataType as any, data as object)
      const errors = await validate(instance as object)

      if (errors.length > 0) {
        throw new Error(`数据校验失败: ${errors.map((e) => Object.values(e.constraints || {}).join(', ')).join('; ')}`)
      }

      return {
        code: 200,
        msg: message,
        result: instance,
      }
    }

    // 如果没有提供数据类型，直接返回
    return {
      code: 200,
      msg: message,
      result: data,
    }
  }
}

// src/dto/one1.zod.ts
import { z } from 'zod'
import { createZodDto } from 'nestjs-zod'

// 业务数据部分
export const One1ResultSchema = z.object({
  name_aaa2: z.string(),
  name_bbb2: z.string(),
})

// 统一响应模型：{ code, msg, result }
export const One1ResponseSchema = z.object({
  code: z.number().int(),
  msg: z.string(),
  result: One1ResultSchema,
})

// 生成 Nest 可用的 DTO（供 Swagger 识别）
export class One1ResultDto extends createZodDto(One1ResultSchema) {}
export class One1ResponseDto extends createZodDto(One1ResponseSchema) {}

// 有没有更好的方式 借助第三方工具包
@Api_public()
@ApiTags('test5_demo4')
@Controller('test5_demo4')
export class test5_demo4 {
  @Get('one1')
  @ApiOkResponse({ description: '测试功能' /* type: swagger的提示*/ })
  one1() /*返回值的校验*/ {
    const result = { code: 200, msg: '我成功了', result: { name_aaa2: 'a222', name_bbb2: 'b222' } }
    return result
  }
}
