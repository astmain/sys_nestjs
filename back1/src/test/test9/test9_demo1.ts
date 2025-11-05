import { /*文档*/ ApiTags, ApiOperation, ApiOkResponse, ApiProperty, ApiHideProperty } from '@nestjs/swagger'
import { /*接口*/ Controller, Body, Post, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common'
import { /*api开发*/ Api_public } from '@src/App_Auth'
import { /*数据库*/ db } from '@src/App_Prisma'
import { IsNumber, IsString, IsBoolean, IsDate, IsArray } from 'class-validator'
import { Type, Transform, Exclude, Expose, plainToInstance } from 'class-transformer'
import { Reflector } from '@nestjs/core'
import { db_page } from '@src/Plugins/db_page'

import { applyDecorators } from '@nestjs/common'

// 创建装饰器工厂，返回一个装饰器函数
export function ApiPost(label: string, description?: string, Res_type?: any) {
  return function (target: object, propertyKey: string, descriptor: PropertyDescriptor) {
    // 使用 applyDecorators 组合多个装饰器
    const decorators = applyDecorators(
      ApiOkResponse({ description: '操作成功', type: Res_type }),
      Post(propertyKey), // 使用方法名作为路由路径
      ApiOperation({
        summary: label,
        description: `<h2 style="color: rgb(73, 204, 144) ;">[${label}]</h2>${description || ''}`,
      }),
    )

    // 应用装饰器到目标方法
    return decorators(target, propertyKey, descriptor)
  }
}

// dto
// 默认排除所有属性
export class test9_dto1 {
  @ApiProperty({ description: '用户ID', example: 1 })
  @Expose()
  @IsNumber()
  id!: number

  @ApiProperty({ description: '手机号码', example: '15160315110' })
  @IsString()
  @Expose()
  phone!: string

  @ApiProperty({ description: '密码', example: '123456' })
  @IsString()
  @Exclude()
  password!: string

  @ApiProperty({ description: '是否删除', example: false })
  @Exclude()
  @IsBoolean()
  is_delete!: boolean

  @ApiProperty({ description: '创建时间', example: '2025-09-11T16:57:10.847Z' })
  @IsDate()
  @Exclude()
  created_at!: Date

  @ApiProperty({ description: '更新时间', example: '2025-09-11T16:57:10.847Z' })
  @Exclude()
  @IsDate()
  updated_at!: Date

  @ApiProperty({ description: '是否检查', example: true })
  @IsBoolean()
  @Exclude()
  is_check!: boolean

  @ApiProperty({ description: '是否激活', example: true })
  @Exclude()
  @IsBoolean()
  is_active!: boolean

  @ApiProperty({ description: '是否公开', example: true })
  @Exclude()
  @IsBoolean()
  is_public!: boolean

  @ApiProperty({ description: '文件格式', example: '.png' })
  @Exclude()
  @IsString()
  type_format!: string

  @ApiProperty({ description: '区域', example: '三角' })
  @Exclude()
  @IsString()
  type_area!: string

  @ApiProperty({ description: '点位', example: '3k以下' })
  @Exclude()
  @IsString()
  type_point!: string

  @ApiProperty({ description: '图片', example: ['.png', '.jpg'] })
  @IsArray()
  @Exclude()
  @IsArray()
  list_img!: any

  @ApiProperty({ description: '扩展', example: ['.png', '.jpg'] })
  @IsArray()
  @Exclude()
  @IsArray()
  list_extend!: any

  @ApiProperty({ description: '文件', example: ['.png', '.jpg'] })
  @IsArray()
  @Exclude()
  @IsArray()
  list_file!: any
}



@Api_public()
@ApiTags('test9_demo1')
@Controller('test9_demo1')
@UseInterceptors(new ClassSerializerInterceptor(new Reflector(), { excludeExtraneousValues: true }))
export class test9_demo1 {
  @ApiPost('查询_用户信息_列表', '', test9_dto1)
  async find_list_test6_demo1(@Body() body: any): Promise<test9_dto1[]> {
    const list = await db.tb_test1.findMany({ where: { password: '123456' } })
    let currentPage = 1
    let pageSize = 10
    let res = await db_page(
      db.tb_test1,
      { where: { is_active: true }, orderBy: { created_at: 'desc' }, select: { id: true, phone: true } }, //
      { mode: 'page', currentPage, pageSize },
    )

    console.log(`111---222:`, res)

    return res.list
  }
}
