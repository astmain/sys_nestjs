import { /*文档*/ ApiTags, ApiOperation, ApiOkResponse, ApiProperty, ApiBody, ApiExtraModels } from '@nestjs/swagger'
import { /*接口*/ Controller, Get, Inject, Body } from '@nestjs/common'
import { /*api开发*/ Api_public } from '@src/App_Auth'
import { /*数据库*/ db } from '@src/App_Prisma'
import { IsString } from 'class-validator'

export class test5_dto1 {
  @ApiProperty({ description: 'name_aaa1', example: 'a111' })
  @IsString()
  name_aaa1: string = 'a111'
}

function VO2<T>(data: new () => T) {
  // 创建唯一的类名，避免Swagger类型冲突=============================
  const keyName = 'data1'
  const uniqueId1 = Math.random().toString(36).substr(2, 9)
  const uniqueId2 = Math.random().toString(36).substr(2, 9)
  const uniqueId3 = Math.random().toString(36).substr(2, 9)
  const data_name = `data_name_${uniqueId1}`
  const res_name = `res_name_${uniqueId2}`
  console.log(`111---data:`, data, typeof data, data.name, data.toString(), data.constructor.name, data.constructor.toString())
  console.log(`111---data:`, data.prototype)

  // Class_data==================================================
  class class1 {
    @ApiProperty({
      description: '数据对象data',
      type: data,
    })
    [keyName]: T
  }

  // 设置类名
  Object.defineProperty(class1, 'name', { value: data_name })

  // 动态创建响应类==================================================
  class Class_res<T> {
    @ApiProperty({ description: '状态码', example: 200 })
    code: number

    @ApiProperty({ description: '响应消息', example: '操作成功' })
    msg: string

    @ApiProperty({ description: '响应数据result', type: test5_dto1 })
    result: test5_dto1 = new test5_dto1()

    // constructor(code: number = 200, msg: string = '操作成功', result: T) {
    //   this.code = code
    //   this.msg = msg
    //   // this.result = result
    // }
  }
  Object.defineProperty(Class_res, 'name', { value: res_name })

  return Class_res
}

@Api_public()
@ApiTags('🟫test5_demo1')
@Controller('test5_demo1')
export class test5_demo1 {
  @Get('one1')
  @ApiOkResponse({ description: '测试功能', type: VO2(test5_dto1) })
  async one1(@Body() body: any) {
    console.log(`111---222:`, 1111)
    const one = await db.tb_test1.findFirst({ where: { password: '123456' } })

    // return { code: 200, msg: '成111功', result: { one111: one, aaa: { name_aaa: '111' } } }
    return { code: 200, msg: '成111功', result: { name_aaa: '111' } }
  }
}

/*
{
  "code": 200,
  "msg": "成111功",
  "result": {
    "one111": {
      "id": 154,
      "phone": "1-1",
      "password": "123456",
      "created_at": "2025-09-10T15:44:08.737Z",
      "updated_at": "2025-09-10T15:44:08.737Z"
    },
    "aaa": {
      "name_aaa": "111"
    }
  }
}

*/
