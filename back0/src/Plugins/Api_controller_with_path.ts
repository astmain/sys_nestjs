import { applyDecorators } from '@nestjs/common'
import { Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

/**
 * Api_controller_with_path装饰器
 * 支持自定义控制器路径和API标签
 * @param path 控制器路径
 * @param tag API标签，如果不提供则使用路径
 * @returns 装饰器函数
 */
export function Api_controller_with_path(path: string, tag?: string) {
  return function <T extends { new (...args: any[]): {} }>(target: T) {
    // 使用applyDecorators组合多个装饰器
    const decorators = applyDecorators(
      Controller(path), // 使用自定义路径
      ApiTags(tag || path), // 使用自定义标签或路径
    )

    // 应用装饰器到目标类
    return decorators(target)
  }
}
