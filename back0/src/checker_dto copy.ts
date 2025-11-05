// // src/checker_dto.ts
// import { Injectable, OnModuleInit, Logger } from '@nestjs/common'
// import { DiscoveryService, Reflector } from '@nestjs/core'
// import { PATH_METADATA, METHOD_METADATA } from '@nestjs/common/constants'
// import * as fs from 'fs'
// import * as path from 'path'

// @Injectable()
// export class DtoDupCheckerService implements OnModuleInit {
//   private readonly logger = new Logger(DtoDupCheckerService.name)

//   constructor(
//     private readonly discovery: DiscoveryService,
//     private readonly reflector: Reflector,
//   ) {}

//   onModuleInit() {
//     const dtoMap = new Map<string, { file: string; className: string; line: number }[]>()
//     const duplicateDtos: string[] = []

//     // 1) 扫描所有 TypeScript 文件中的 DTO 类定义
//     this.scanDtoClasses(dtoMap)

//     // 2) 检查重复的 DTO 类名
//     for (const [dtoName, locations] of dtoMap.entries()) {
//       if (locations.length > 1) {
//         const locationsStr = locations.map((loc) => `${loc.className} (${loc.file}:${loc.line})`).join(', ')
//         duplicateDtos.push(`${dtoName}  <=  ${locationsStr}`)
//       }
//     }

//     if (duplicateDtos.length) {
//       this.logger.warn('检测到重复的 DTO 类名：\n' + duplicateDtos.join('\n'))
//       this.logger.warn('建议：为每个 DTO 类使用唯一的名称，如 test1_dto1, test2_dto1')
//     } else {
//       this.logger.log('DTO 类名重复检查通过 ✅')
//     }
//   }

//   // ------- 工具方法 -------
//   private scanDtoClasses(dtoMap: Map<string, { file: string; className: string; line: number }[]>) {
//     const srcDir = path.join(process.cwd(), 'src')
//     this.scanDirectory(srcDir, dtoMap)
//   }

//   private scanDirectory(dir: string, dtoMap: Map<string, { file: string; className: string; line: number }[]>) {
//     try {
//       const files = fs.readdirSync(dir)
      
//       for (const file of files) {
//         const filePath = path.join(dir, file)
//         const stat = fs.statSync(filePath)
        
//         if (stat.isDirectory()) {
//           this.scanDirectory(filePath, dtoMap)
//         } else if (file.endsWith('.ts') && !file.endsWith('.d.ts')) {
//           this.scanFile(filePath, dtoMap)
//         }
//       }
//     } catch (error) {
//       // 忽略无法访问的目录
//     }
//   }

//   private scanFile(filePath: string, dtoMap: Map<string, { file: string; className: string; line: number }[]>) {
//     try {
//       const content = fs.readFileSync(filePath, 'utf-8')
//       const lines = content.split('\n')
      
//       // 查找 export class 定义
//       for (let i = 0; i < lines.length; i++) {
//         const line = lines[i].trim()
        
//         // 匹配 export class ClassName 模式
//         const classMatch = line.match(/^export\s+class\s+(\w+)/)
//         if (classMatch) {
//           const className = classMatch[1]
          
//           // 跳过控制器类（通常以 Controller 结尾或包含 App_）
//           if (this.isControllerClass(className)) {
//             continue
//           }
          
//           // 跳过内置类型
//           if (this.isBuiltInType(className)) {
//             continue
//           }
          
//           const relativePath = path.relative(process.cwd(), filePath)
//           const list = dtoMap.get(className) ?? []
//           list.push({ 
//             file: relativePath, 
//             className: className,
//             line: i + 1
//           })
//           dtoMap.set(className, list)
//         }
//       }
//     } catch (error) {
//       // 忽略无法读取的文件
//     }
//   }

//   private isControllerClass(className: string): boolean {
//     return className.endsWith('Controller') || 
//            className.includes('App_') ||
//            className.includes('test') && className.includes('_')
//   }

//   private isBuiltInType(typeName: string): boolean {
//     const builtInTypes = [
//       'String', 'Number', 'Boolean', 'Object', 'Array', 'Date', 'Function',
//       'RegExp', 'Error', 'Promise', 'Map', 'Set', 'WeakMap', 'WeakSet',
//       'Symbol', 'BigInt', 'Request', 'Response', 'NextFunction',
//       'Module', 'Service', 'Guard', 'Interceptor', 'Filter', 'Pipe'
//     ]
//     return builtInTypes.includes(typeName) || typeName.startsWith('_')
//   }
// }