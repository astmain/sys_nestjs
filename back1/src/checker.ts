// src/infra/route-dup-checker.service.ts
import { Injectable, OnModuleInit, Logger } from '@nestjs/common'
import { DiscoveryService, Reflector } from '@nestjs/core'
import { PATH_METADATA, METHOD_METADATA, VERSION_METADATA } from '@nestjs/common/constants'
import { RequestMethod } from '@nestjs/common'

type HttpMethod = keyof typeof RequestMethod

@Injectable()
export class RouteDupCheckerService implements OnModuleInit {
  private readonly logger = new Logger(RouteDupCheckerService.name)

  constructor(
    private readonly discovery: DiscoveryService,
    private readonly reflector: Reflector,
  ) {}

  onModuleInit() {
    const map = new Map<string, { handler: string; ctrl: string }[]>()

    // 1) 找出所有控制器实例
    const controllers = this.discovery.getControllers().filter((w) => !!w.instance)

    for (const wrapper of controllers) {
      const ctrl = wrapper.instance.constructor
      const ctrlName = ctrl.name
      // 控制器可能是 ['a', 'b'] 多路径
      const ctrlPaths = this.ensureArray(this.reflector.get<string | string[]>(PATH_METADATA, ctrl) ?? '')

      // 2) 扫描控制器原型的方法
      const proto = wrapper.instance
      const methodNames = this.getAllMethodNames(proto)

      for (const methodName of methodNames) {
        const target = proto[methodName]
        // 方法的 HTTP method（默认为 RequestMethod.ALL）
        const reqMethod: RequestMethod = this.reflector.get<RequestMethod>(METHOD_METADATA, target) ?? RequestMethod.ALL

        const methodStr = RequestMethod[reqMethod] as HttpMethod // e.g. 'GET' | 'POST' | 'ALL'

        // 方法路径可能是 string|string[]
        const methodPaths = this.ensureArray(this.reflector.get<string | string[]>(PATH_METADATA, target) ?? '')

        // 版本（可能是 string|string[]）
        const versions = this.ensureArray(this.reflector.get<string | number | (string | number)[] | undefined>(VERSION_METADATA, target) ?? this.reflector.get(VERSION_METADATA, ctrl))

        // 3) 组合所有路径
        for (const cPath of ctrlPaths) {
          for (const mPath of methodPaths) {
            const fullPath = this.normalizePath(`/${cPath}/${mPath}`)
            const versionKeys = versions.length ? versions : [undefined]

            for (const v of versionKeys) {
              // 如果你启用了 URL 版本（如 /v1/...），可按需拼接
              const versionedPath = v !== undefined ? this.normalizePath(`/v${v}${fullPath}`) : fullPath

              const key = `${methodStr} ${versionedPath}` // e.g. "GET /test1/App_test4/one1"
              const list = map.get(key) ?? []
              list.push({ handler: `${ctrlName}.${methodName}()`, ctrl: ctrlName })
              map.set(key, list)
            }
          }
        }
      }
    }

    // 4) 查重并抛错/打印
    const dups: string[] = []
    for (const [key, owners] of map.entries()) {
      if (owners.length > 1) {
        const ownersStr = owners.map((o) => o.handler).join(', ')
        dups.push(`${key}  <=  ${ownersStr}`)
      }
    }

    if (dups.length) {
      this.logger.error('检测到重复路由：\n' + dups.join('\n'))
      // 强制失败（也可以改成只 warn）
      throw new Error('重复路由映射，请修正上面列出的冲突。')
    } else {
      this.logger.log('路由重复检查通过 ✅')
    }
  }

  // ------- 工具方法 -------
  private ensureArray<T>(v: T | T[]): T[] {
    return Array.isArray(v) ? v : [v]
  }

  private normalizePath(p: string) {
    // 合并多余斜杠，移除末尾斜杠
    return ('/' + p).replace(/\/+/g, '/').replace(/\/$/, '').trim()
  }

  private getAllMethodNames(obj: any): string[] {
    const names = new Set<string>()
    let proto = obj
    while (proto && proto !== Object.prototype) {
      for (const name of Object.getOwnPropertyNames(proto)) {
        if (name === 'constructor') continue
        const desc = Object.getOwnPropertyDescriptor(proto, name)
        if (desc && typeof desc.value === 'function') names.add(name)
      }
      proto = Object.getPrototypeOf(proto)
    }
    return [...names]
  }
}
