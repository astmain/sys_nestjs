import { Module } from '@nestjs/common'

import { my_prisma } from './Plugins/my_prisma'
import { AppAuthorized_module } from './AppAuthorized'

@Module({
  imports: [
    my_prisma.make_path({ path: '/v1' }), //数据库prisma
    AppAuthorized_module, //授权管理
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
