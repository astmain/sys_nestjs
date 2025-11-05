import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
// import { DiscoveryService } from '@nestjs/core'
import { App_Auth_Module } from './App_Auth'
import { PrismaModule } from './prisma/prisma.module'
import { UserModule } from './modules/user/user.module'
import { App_Prisma } from './App_Prisma'
// import { RouteDupCheckerService } from './checker'
// import { DtoDupCheckerService } from './checker_dto'

import { App_Controller } from '@src/App_Controller'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: '.env',
    }),
    App_Auth_Module,
    PrismaModule,
    App_Prisma,
    UserModule,
  ],
  controllers: [
    // 首页
    App_Controller,
    // demo1(示例1)
    require('@src/demo/demo1/demo1').demo1,


    // test10(测试功能)
    require('@src/test/test10/test10_demo1').test10_demo1,
    // test9(测试功能)
    require('@src/test/test9/test9_demo1').test9_demo1,

    // test8(测试功能)
    require('@src/test/test8/test8_demo1').test8_demo1,

    // test7(测试功能)
    require('@src/test/test7/test7_demo1').test7_demo1,

    // test6(测试功能)
    require('@src/test/test6/test6_demo1').test6_demo1,

    // test5(测试功能)
    require('@src/test/test5/test5_demo1').test5_demo1,
    require('@src/test/test5/test5_demo2').test5_demo2,
    require('@src/test/test5/test5_demo3').test5_demo3,
    require('@src/test/test5/test5_demo4').test5_demo4,
    require('@src/test/test5/test5_demo5').test5_demo5,
    // test4(测试功能)
    // require('@src/test/test4/test4_App_test1').test4_App_test1,
    // require('@src/test/test4/test4_App_test2').test4_App_test2,
    // require('@src/test/test4/App_test1').App_test1,

    // require('@src/test/test4/App_test2').App_test2,
    // require('@src/test/test4/App_test3').App_test3,
    // require('@src/test/test4/App_test4').App_test4,

    // test1(测试功能)
    // require('@src/test/test1/App_test1').App_test1,
    // require('@src/test/test1/App_test2').App_test2,
    // require('@src/test/test1/App_test3').App_test3,
    // require('@src/test/test1/App_test4').App_test4,
    // test2(测试功能)
    // require('@src/test/test2/App_test1').App_test1,
    // require('@src/test/test2/App_test2').App_test2,
    // require('@src/test/test2/App_test3').App_test3,
    // require('@src/test/test2/App_test4').App_test4,

    // test3(测试功能)
    // require('@src/test/test3/App_test1').App_test1,
    // require('@src/test/test3/App_test2').App_test2,
    // require('@src/test/test3/App_test3').App_test3,
    // require('@src/test/test3/App_test4').App_test4,
  ],
  providers: [
    // DiscoveryService,
    //  RouteDupCheckerService,
    //   DtoDupCheckerService
  ],
})
export class App_Module {}
