import { getNamespace, getFullName } from '@src/common/decorators/namespace.decorator'

/**
 * 命名空间工具类
 */
export class NamespaceUtils {
  /**
   * 检查类是否属于指定命名空间
   * @param target 目标类
   * @param namespace 命名空间
   * @returns 是否属于指定命名空间
   */
  static isInNamespace(target: any, namespace: string): boolean {
    return getNamespace(target) === namespace
  }

  /**
   * 获取类的完整标识
   * @param target 目标类
   * @returns 完整标识字符串
   */
  static getFullName(target: any): string {
    return getFullName(target)
  }

  /**
   * 创建类型安全的类引用
   * @param target 目标类
   * @param namespace 命名空间
   * @returns 类型安全的类引用
   */
  static createTypedReference<T>(target: new (...args: any[]) => T, namespace: string) {
    if (!this.isInNamespace(target, namespace)) {
      throw new Error(`Class ${target.name} is not in namespace ${namespace}`)
    }
    return target
  }
}

/**
 * 类型安全的导入辅助函数
 */
export function createNamespaceImport<T>(
  target: new (...args: any[]) => T,
  namespace: string
): new (...args: any[]) => T {
  return NamespaceUtils.createTypedReference(target, namespace)
}
