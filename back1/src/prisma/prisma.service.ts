import { Injectable, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect()
  }

  // 递归处理时间字段的函数
  processTimeFields(obj: any): any {
    if (obj === null || obj === undefined) {
      return obj
    }

    if (Array.isArray(obj)) {
      return obj.map((item) => this.processTimeFields(item))
    }

    if (typeof obj === 'object') {
      const processed = { ...obj }

      // 处理时间字段
      if (processed.created_at instanceof Date) {
        processed.created_at = processed.created_at.toISOString()
      }
      if (processed.updated_at instanceof Date) {
        processed.updated_at = processed.updated_at.toISOString()
      }

      // 递归处理嵌套对象
      for (const key in processed) {
        if (typeof processed[key] === 'object') {
          processed[key] = this.processTimeFields(processed[key])
        }
      }

      return processed
    }

    return obj
  }
}
