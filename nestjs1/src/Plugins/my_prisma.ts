import { Module, Global, DynamicModule } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

export const prisma_instance = new PrismaClient()

interface Opt {
  path: string
}

@Global()
@Module({
  imports: [],
  providers: [{ provide: 'my_prisma', useValue: { my_prisma: prisma_instance } }],
  exports: [{ provide: 'my_prisma', useValue: { baseUrl: '/v1' } }],
})
export class my_prisma {
  static make_path(opt: Opt): DynamicModule {
    let result = {
      module: my_prisma,
      providers: [{ provide: 'my_prisma', useValue: prisma_instance }],
    }
    return result
  }
}
