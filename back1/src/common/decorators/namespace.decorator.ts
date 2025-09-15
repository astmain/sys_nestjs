import 'reflect-metadata'

/**
 * 命名空间装饰器接口
 */
export interface NamespaceDecorated {
  new (...args: any[]): any
  getNamespace?(): string
  getFullName?(): string
}

/**
 * 命名空间装饰器，用于解决类名冲突问题
 * @param namespace 命名空间标识
 */
export function Namespace(namespace: string) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T): T & NamespaceDecorated {
    // 将命名空间信息存储到类的元数据中
    Reflect.defineMetadata('namespace', namespace, constructor)
    
    // 为类添加静态方法获取命名空间
    ;(constructor as any).getNamespace = function() {
      return namespace
    }
    
    // 为类添加静态方法获取完整标识
    ;(constructor as any).getFullName = function() {
      return `${namespace}.${constructor.name}`
    }
    
    return constructor as T & NamespaceDecorated
  }
}

/**
 * 获取类的命名空间
 * @param target 目标类
 * @returns 命名空间字符串
 */
export function getNamespace(target: any): string | undefined {
  return Reflect.getMetadata('namespace', target)
}

/**
 * 获取类的完整标识（命名空间.类名）
 * @param target 目标类
 * @returns 完整标识字符串
 */
export function getFullName(target: any): string {
  const namespace = getNamespace(target)
  return namespace ? `${namespace}.${target.name}` : target.name
}
