import { Module } from '@nestjs/common'

import { my_prisma } from './Plugins/my_prisma'
import { AppAuthorized_module } from './AppAuthorized'
import { Module_home } from './index/Module_home/home'
import { Module_test } from './index/Module_test/test'
import { Module_demo } from './index/Module_demo/demo'

@Module({
  imports: [
    my_prisma.make_path({ path: '/v1' }), //数据库prisma
    AppAuthorized_module, //授权管理
    Module_home, //首页
    Module_test, //测试
    Module_demo, //示例
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
