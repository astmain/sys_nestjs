import { Module } from '@nestjs/common'

import { my_prisma } from './Plugins/my_prisma'
import { AppAuthorized_module } from './AppAuthorized'
import { Module_home } from './index/Module_home/home'
import { Module_test } from './index/Module_test/test'
import { Module_demo } from './index/Module_demo/demo'

import { Module_model_kind } from './Module_model_kind/model_kind'
import { Module_model_product } from './Module_model_product/model_product'
import { Module_model_card } from './Module_model_card/model_card'
import { Module_model_order } from './Module_model_order/model_order'

@Module({
  imports: [
    my_prisma.make_path({ path: '/v1' }), //数据库prisma
    AppAuthorized_module, //授权管理
    Module_home, //首页
    Module_test, //测试
    Module_demo, //示例
    Module_model_kind, //模型分类
    Module_model_product, //模型商品
    Module_model_card, //模型购物车
    Module_model_order, //模型订单

  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
