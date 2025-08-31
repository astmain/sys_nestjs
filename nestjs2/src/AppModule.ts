import { Module } from '@nestjs/common'

import { my_prisma } from './Plugins/my_prisma'
import { AppAuthorized_module } from './AppAuthorized'
import { Module_demo } from './Module_demo/demo'
import { model_shop_module } from './model_shop/model_shop'
import { Module_test } from './Module_test/test'
import { Module_home } from './Module_home/index'

@Module({
  imports: [
    my_prisma.make_path({ path: '/v1' }), //数据库prisma
    AppAuthorized_module, //授权管理
    Module_home, //首页
    Module_test, //测试
    Module_demo, //示例
    model_shop_module, //模型商城
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
