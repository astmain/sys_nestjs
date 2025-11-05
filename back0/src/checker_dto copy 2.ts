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

//     // 1) 扫描所有 TypeScript 文件中在 @Body() 中使用的 DTO 类
//     this.scanUsedDtoClasses(dtoMap)

//     // 调试信息：打印所有找到的 DTO 类
//     this.logger.log('找到的 DTO 类:')
//     for (const [dtoName, locations] of dtoMap.entries()) {
//       this.logger.log(`  ${dtoName}: ${locations.length} 个位置`)
//       locations.forEach(loc => {
//         this.logger.log(`    - ${loc.file}:${loc.line}`)
//       })
//     }

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
//   private scanUsedDtoClasses(dtoMap: Map<string, { file: string; className: string; line: number }[]>) {
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
      
//       // 查找 @Body() 中使用的 DTO 类
//       for (let i = 0; i < lines.length; i++) {
//         const line = lines[i].trim()
        
//         // 匹配 @Body() body : ClassName 模式，支持任意空格
//         const bodyMatch = line.match(/@Body\(\)\s+\w+\s*:\s*(\w+)/)
//         if (bodyMatch) {
//           const dtoClassName = bodyMatch[1]
          
//           // 跳过基本类型
//           if (this.isBuiltInType(dtoClassName)) {
//             continue
//           }
          
//           const relativePath = path.relative(process.cwd(), filePath)
//           const list = dtoMap.get(dtoClassName) ?? []
//           list.push({ 
//             file: relativePath, 
//             className: dtoClassName,
//             line: i + 1
//           })
//           dtoMap.set(dtoClassName, list)
          
//           // 调试信息：打印匹配到的行
//           this.logger.log(`匹配到: ${line} -> ${dtoClassName}`)
//         }
//       }
//     } catch (error) {
//       // 忽略无法读取的文件
//     }
//   }

//   private isBuiltInType(typeName: string): boolean {
//     const builtInTypes = [
//       'string', 'number', 'boolean', 'object', 'any', 'unknown',
//       'String', 'Number', 'Boolean', 'Object', 'Array', 'Date', 'Function',
//       'RegExp', 'Error', 'Promise', 'Map', 'Set', 'WeakMap', 'WeakSet',
//       'Symbol', 'BigInt', 'Request', 'Response', 'NextFunction'
//     ]
//     return builtInTypes.includes(typeName) || typeName.startsWith('_')
//   }
// }