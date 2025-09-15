import { /*文档*/ ApiTags, ApiOperation, ApiOkResponse, ApiProperty, ApiHideProperty } from '@nestjs/swagger'
import { /*接口*/ Controller, Body, Post, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common'
import { /*api开发*/ Api_public } from '@src/App_Auth'
import { /*数据库*/ db } from '@src/App_Prisma'
import { /*控制器装饰器*/ Api_Controller } from '@src/Plugins/Api_Controller'
import { /*控制器装饰器*/ Api_Post } from '@src/Plugins/Api_Post'

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

// 导入严格类型检查工具

@Api_public()
@Api_Controller('test10_demo1控制器')
export class test10_demo1 {
  @ApiPost('查询_用户信息_列表', '')
  async find_list_test6_demo1(@Body() body: any) {
    const list = await db.tb_test1.findMany({ where: { password: '123456' } })
    return list
  }
}
