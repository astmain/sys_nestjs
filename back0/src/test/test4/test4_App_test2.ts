import { /*文档*/ ApiTags, ApiOperation, ApiOkResponse, ApiProperty, ApiBody, ApiExtraModels } from '@nestjs/swagger'
import { /*接口*/ Controller, Get, Inject, Body } from '@nestjs/common'
import { /*api开发*/ Api_public } from '@src/App_Auth'
import { /*数据库*/ db } from '@src/App_Prisma'

export class test4_dto1_1 {
  @ApiProperty({ description: 'name_aaa2', example: 'a222' })
  name_aaa2: string = 'a222'
  @ApiProperty({ description: 'name_bbb2', example: 'b222' })
  name_bbb2: string = 'b222'
}



@Api_public()
@ApiTags('🟪test4_App_test2')
@Controller('test4_App_test2')
export class test4_App_test2 {
  @Get('one1')
  async one1(@Body() body: test4_dto1_1) {
    console.log(body)
    const one = await db.tb_test1.findFirst({ where: { password: '123456' } })
    return { code: 200, msg: '成111功', result: { one111: one, aaa: { name_aaa: 1111 } } }
  }


}
