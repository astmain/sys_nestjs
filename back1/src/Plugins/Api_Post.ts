import { /*文档*/ ApiTags, ApiOperation, ApiOkResponse, ApiProperty, ApiHideProperty } from '@nestjs/swagger'
import { /*接口*/ Controller, Body, Post, UseInterceptors, ClassSerializerInterceptor,applyDecorators } from '@nestjs/common'


// 创建装饰器工厂，返回一个装饰器函数
export function Api_Post(label: string, description?: string, Res_type?: any) {
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