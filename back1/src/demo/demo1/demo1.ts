import { /*文档*/ ApiTags, ApiOperation, ApiOkResponse, ApiProperty, ApiHideProperty } from '@nestjs/swagger'
import { /*接口*/ Controller, Body, Post, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common'
import { /*api开发*/ Api_public } from '@src/App_Auth'
import { /*数据库*/ db } from '@src/App_Prisma'
import { /*控制器装饰器*/ Api_Controller } from '@src/Plugins/Api_Controller'
import { /*控制器装饰器*/ Api_Post } from '@src/Plugins/Api_Post'
import { tb_test1, Prisma } from '@prisma/client' //我想用这个类型 创建一个DTO_TEST1,应该怎么做
import { /* 校验*/ IsNumber, IsOptional, IsString, IsBoolean, IsArray, IsDate } from 'class-validator'

// 创建用于创建操作的 DTO（排除自动生成的字段）
export class DTO_TEST1_Create implements Prisma.tb_test1GetPayload<{}> {
  @ApiProperty({ description: 'ID', example: 1 })
  @IsNumber()
  id: number

  @ApiProperty({ description: '手机号', example: '13800138000' })
  @IsString()
  phone: string

  @ApiProperty({ description: '密码', example: '123456' })
  @IsString()
  password: string

  @ApiProperty({ description: '是否删除', example: false })
  @IsBoolean()
  is_delete: boolean

  @ApiProperty({ description: '是否检查', example: false })
  @IsBoolean()
  is_check: boolean

  @ApiProperty({ description: '是否激活', example: false })
  @IsBoolean()
  is_active: boolean

  @ApiProperty({ description: '是否公开', example: false })
  @IsBoolean()
  is_public: boolean

  @ApiProperty({ description: '文件列表', example: [] })
  @IsArray()
  list_file: any

  @ApiProperty({ description: '图片列表', example: [] })
  @IsArray()
  list_img: any

  @ApiProperty({ description: '扩展列表', example: [] })
  @IsArray()
  list_extend: any

  @ApiProperty({ description: '格式类型', example: '.png' })
  @IsString()
  type_format: string

  @ApiProperty({ description: '区域类型', example: '三角' })
  @IsString()
  type_area: string

  @ApiProperty({ description: '点位类型', example: '3k以下' })
  @IsString()
  type_point: string

  @ApiProperty({ description: '创建时间', example: '2024-01-01T00:00:00.000Z' })
  @IsDate()
  created_at: Date

  @ApiProperty({ description: '更新时间', example: '2024-01-01T00:00:00.000Z' })
  @IsDate()
  updated_at: Date
}

@Api_public()
@Api_Controller('demo1测试')
export class demo1 {
  @Api_Post('查找-示例1-list', '')
  async find_list_demo1(@Body() body: any) {
    console.log(1111, DTO_TEST1_Create, typeof DTO_TEST1_Create)
    const list = await db.tb_test1.findMany({ where: { password: '123456' } })
    return list
  }
}
