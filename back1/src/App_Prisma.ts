    import { Module, Global, DynamicModule } from '@nestjs/common'
    import { PrismaClient } from '@prisma/client'

    export const prisma_instance = new PrismaClient()
    export const db = new PrismaClient()

    interface Opt {
    path: string
    }

    @Global()
    @Module({
    imports: [],
    providers: [{ provide: 'App_Prisma', useValue: { App_Prisma: prisma_instance } }],
    exports: [{ provide: 'App_Prisma', useValue: { baseUrl: '/v1' } }],
    })
    export class App_Prisma {
    static make_path(opt: Opt): DynamicModule {
    // console.log('my_prisma---opt:', opt)
    const result = {
    module: App_Prisma,
    providers: [{ provide: 'App_Prisma', useValue: prisma_instance }],
    }
    return result
    }
    }
