import { Module } from '@nestjs/common'

import { my_prisma } from './Plugins/my_prisma'
import { AppAuthorized_module } from './AppAuthorized'
import { Module_home } from './index/Module_home/home'
import { Module_test } from './index/Module_test/test'
import { Module_demo } from './index/Module_demo/demo'

import { model_kind_Module } from './model_kind/model_kind'
import { model_product_Module } from './model_product/model_product'
import { model_card_Module } from './model_card/model_card'
import { model_order_Module } from './model_order/model_order'

@Module({
  imports: [
    my_prisma.make_path({ path: '/v1' }), //数据库prisma
    AppAuthorized_module, //授权管理
    Module_home, //首页
    Module_test, //测试
    Module_demo, //示例
    // 模型订单
    model_kind_Module, //模型分类
    model_product_Module, //模型商品
    model_card_Module, //模型购物车
    model_order_Module, //模型订单
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
