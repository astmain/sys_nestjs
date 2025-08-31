import { Module } from '@nestjs/common'
import { index } from './home/index'

import { my_prisma } from './Plugins/my_prisma'
import { AppAuthorized_module } from './AppAuthorized'
import { test_module } from './home/test'     
import { model_shop_module } from './model_shop/model_shop'

@Module({
  imports: [
    my_prisma.make_path({ path: '/v1' }), //数据库prisma
    test_module, //测试
    AppAuthorized_module, //授权管理
    model_shop_module, //模型商城
  ],
  controllers: [index],
  providers: [],
  exports: [],
})
export class AppModule {}
