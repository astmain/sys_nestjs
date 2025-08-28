import { Module } from '@nestjs/common'
import { index } from './Controller/index/index'

import { my_prisma } from './Plugins/my_prisma'
import * as db_prisma from './Plugins/db_prisma'
import { AppAuthorized_module } from './AppAuthorized'

@Module({
  imports: [
    db_prisma.prisma_module, //数据库prisma
    my_prisma.make_path({ path: '/v1' }), //数据库prisma
    AppAuthorized_module, //授权管理
  ],
  controllers: [index],
  providers: [],
  exports: [],
})
export class AppModule {}
