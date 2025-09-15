import { applyDecorators } from '@nestjs/common'
import { Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

/**
 * Api_controller装饰器
 * 自动使用类名作为控制器路径，并添加ApiTags
 * @param description 可选的控制器描述，如果不提供则使用类名
 * @returns 装饰器函数
 */
export function Api_controller(description?: string) {
  return function <T extends { new (...args: any[]): {} }>(target: T) {
    // 获取类名
    const class_name = target.name

    // 使用applyDecorators组合多个装饰器
    const decorators = applyDecorators(
      Controller(class_name), // 使用类名作为控制器路径
      ApiTags(description || class_name), // 使用描述或类名作为API标签
    )

    // 应用装饰器到目标类
    return decorators(target)
  }
}
