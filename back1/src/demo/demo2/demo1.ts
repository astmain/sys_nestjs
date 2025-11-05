import { /*文档*/ ApiTags, ApiOperation, ApiOkResponse, ApiProperty, ApiHideProperty } from '@nestjs/swagger'
import { /*接口*/ Controller, Body, Post, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common'
import { /*校验*/ IsNumber, IsOptional, IsString, IsBoolean, IsArray, IsDate } from 'class-validator'
import { /*开发接口*/ Api_public } from '@src/App_Auth'
import { /*数据库*/ db } from '@src/App_Prisma'
import { /*控制器装饰器*/ Api_Controller } from '@src/Plugins/Api_Controller'
import { /*请求Post*/ Api_Post } from '@src/Plugins/Api_Post'
import { tb_test1, Prisma } from '@prisma/client' //我想用这个类型 创建一个DTO_TEST1,应该怎么做

@Api_public()
@Api_Controller('demo2测试')
export class demo2 {
  @Api_Post('查找-示例1-list', '')
  async find_list_demo2(@Body() body: any) {
    const list = await db.tb_test1.findMany({ where: { password: '123456' } })
    return list
  }
}
