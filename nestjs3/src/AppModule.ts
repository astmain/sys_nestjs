import { Module } from '@nestjs/common'
import { index } from './Controller/index/index'

import { my_prisma } from './Plugins/my_prisma'
import { AppAuthorized_module } from './AppAuthorized'
import { test_module } from './Controller/test/test'

@Module({
  imports: [
    my_prisma.make_path({ path: '/v1' }), //数据库prisma
    test_module, //测试
    AppAuthorized_module, //授权管理
  ],
  controllers: [index],
  providers: [],
  exports: [],
})
export class AppModule {}
