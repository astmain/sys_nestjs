import { /*文档*/ ApiTags, ApiOperation, ApiOkResponse, ApiProperty, ApiBody, ApiExtraModels } from '@nestjs/swagger'
import { /*接口*/ Controller, Get, Inject, Body } from '@nestjs/common'
import { /*api开发*/ Api_public } from '@src/App_Auth'
import { /*数据库*/ db } from '@src/App_Prisma'

export class test4_dto1 {
  @ApiProperty({ description: 'name_aaa1', example: 'a111' })
  name_aaa1: string = 'a111'
}

@Api_public()
@ApiTags('🟪test4_App_test1')
@Controller('test4_App_test1')
export class test4_App_test1 {
  @Get('one1')
  @ApiOperation({ summary: 'test4_App_test1_one1' })
  // @ApiBody({
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       name_aaa1: {
  //         type: 'string',
  //         description: 'name_aaa1',
  //         example: 'a111',
  //       },
  //       age: {
  //         type: 'number',
  //         description: '年龄',
  //         example: 18,
  //       },
  //     },
  //     required: ['name_aaa1'],
  //   },
  // })
  async one1(@Body() body: test4_dto1) {
    const one = await db.tb_test1.findFirst({ where: { password: '123456' } })
    return { code: 200, msg: '成111功', result: { one111: one, aaa: { name_aaa: '111' } } }
  }
}
