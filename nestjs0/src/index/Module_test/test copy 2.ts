// // 自定义包
// import { Dec_public } from '@src/AppAuthorized'
// import { ApiTags } from '@nestjs/swagger'
// import { Controller, Get, Post } from '@nestjs/common'
// import { AppController } from '@src/Plugins/AppController'

// @ApiTags('测试')
// @Dec_public()
// @Controller()
// export class test extends AppController {
//   @Post('test_user')
//   我应该如何写响应数据
//   async test_user()  我应该如何写响应校验 {
//     return { code: 200, msg: 'test_user', result: { name: '111' } }
//   }
// }

// import { Module } from '@src/Plugins/AppController'
// @Module({
//   controllers: [test],
//   providers: [],
// })
// export class Module_test {}
