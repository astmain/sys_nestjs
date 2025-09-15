import { /*文档*/ ApiTags, ApiOperation, ApiOkResponse, ApiProperty, ApiBody, ApiExtraModels } from '@nestjs/swagger'
import { /*接口*/ Controller, Get, Inject, Body } from '@nestjs/common'
import { /*api开发*/ Api_public } from '@src/App_Auth'
import { /*数据库*/ db } from '@src/App_Prisma'

export class test5_dto2 {
  @ApiProperty({ description: 'name_aaa2', example: 'a222' })
  name_aaa2: string = 'a222'
  @ApiProperty({ description: 'name_bbb2', example: 'b222' })
  name_bbb2: string = 'b222'
}
// 帮我改造这个函数,我不想要数据对象
export function VO<T>(dataType: new () => T, keyName: string = 'data') {
  // 创建唯一的类名，避免Swagger类型冲突
  const uniqueId = Math.random().toString(36).substr(2, 9)
  const wrapperClassName = `Wrapper_${keyName}_${uniqueId}`
  const responseClassName = `Response_${keyName}_${uniqueId}`

  // 1111111动态创建包装类
  class WrapperClass {
    @ApiProperty({
      description: '数据对象',
      type: dataType,
    })
    [keyName]: T
  }

  // 设置类名
  Object.defineProperty(WrapperClass, 'name', { value: wrapperClassName })

  // 2222222通用响应DTO - 包含code和msg
  class Base_Response_Dto<T = any> {
    @ApiProperty({ description: '状态码', example: 200 })
    code: number

    @ApiProperty({ description: '响应消息', example: '操作成功' })
    msg: string

    @ApiProperty({ description: '响应数据' })
    result: T

    constructor(code: number = 200, msg: string = '操作成功', result: T = null as T) {
      this.code = code
      this.msg = msg
      this.result = result
    }
  }

  // 3333333动态创建响应类
  class ResponseClass extends Base_Response_Dto<WrapperClass> {
    @ApiProperty({ description: '状态码', example: 200 })
    code: number

    @ApiProperty({ description: '响应消息', example: '操作成功' })
    msg: string

    @ApiProperty({
      description: '响应数据',
      type: WrapperClass,
    })
    result: WrapperClass
  }

  // 设置类名
  Object.defineProperty(ResponseClass, 'name', { value: responseClassName })

  return ResponseClass
}

@Api_public()
@ApiTags('🟫test5_demo2')
@Controller('test5_demo2')
export class test5_demo2 {
  @Get('one1')
  @ApiOkResponse({ description: '测试功能', type: VO(test5_dto2) })
  async one1(@Body() body: any) {
    console.log(body)
    const one = await db.tb_test1.findFirst({ where: { password: '123456' } })
    return { code: 200, msg: '成111功', result: { data: { name_aaa1: 1111 } } }
  }
}
