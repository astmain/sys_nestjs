import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

// 服务类
@Injectable()
export class service extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect()
  }
  async onModuleDestroy() {
    await this.$disconnect()
  }
}

// 模块类
import { Module } from '@nestjs/common'
@Module({
  providers: [service],
  exports: [service],
})
export class prisma_module {}
