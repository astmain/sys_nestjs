import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { TimeFieldsInterceptor } from '../../common/interceptors/time_fields.interceptor'
import { PrismaService } from '../../prisma/prisma.service'

@Module({
  controllers: [UserController],
  providers: [UserService, TimeFieldsInterceptor, PrismaService],
  exports: [UserService],
})
export class UserModule {}
