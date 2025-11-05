import { /*文档*/ ApiTags, ApiOperation, ApiOkResponse, ApiProperty, ApiBody, ApiExtraModels } from '@nestjs/swagger'
import { /*接口*/ Controller, Get, Inject, Body } from '@nestjs/common'
import { /*api开发*/ Api_public } from '@src/App_Auth'
import { /*数据库*/ db } from '@src/App_Prisma'

export class test5_dto3 {
  @ApiProperty({ description: 'name_aaa2', example: 'a222' })
  name_aaa2: string = 'a222'
  @ApiProperty({ description: 'name_bbb2', example: 'b222' })
  name_bbb2: string = 'b222'
}

// 改造后的函数，移除数据对象
export function VO<T>(dataType: new () => T) {
  // 创建唯一的类名，避免Swagger类型冲突
  const uniqueId = Math.random().toString(36).substr(2, 9)
  const responseClassName = `Response_${uniqueId}`

  // 通用响应DTO - 直接包含数据类型
  class Base_Response_Dto<T = any> {
    @ApiProperty({ description: '状态码', example: 200 })
    code: number

    @ApiProperty({ description: '响应消息', example: '操作成功' })
    msg: string

    @ApiProperty({ description: '响应数据', type: dataType })
    result: T

    constructor(code: number = 200, msg: string = '操作成功', result: T = null as T) {
      this.code = code
      this.msg = msg
      this.result = result
    }
  }

  // 动态创建响应类
  class ResponseClass extends Base_Response_Dto<T> {
    @ApiProperty({ description: '状态码', example: 200 })
    code: number

    @ApiProperty({ description: '响应消息', example: '操作成功' })
    msg: string

    @ApiProperty({
      description: '响应数据',
      type: dataType,
    })
    result: T
  }

  // 设置类名
  Object.defineProperty(ResponseClass, 'name', { value: responseClassName })

  return ResponseClass
}

@Api_public()
@ApiTags('🟫test5_demo3')
@Controller('test5_demo3')
export class test5_demo3 {
  @Get('one1')
  @ApiOkResponse({ description: '测试功能', type: VO(test5_dto3) })
  async one1(@Body() body: any) {
    console.log(body)
    const one = await db.tb_test1.findFirst({ where: { password: '123456' } })
    return { code: 200, msg: '成111功', result: { name_aaa2: 'a222', name_bbb2: 'b222' } }
  }
}
