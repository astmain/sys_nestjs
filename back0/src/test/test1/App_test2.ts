import { /*接口*/ Controller, Get, Inject } from '@nestjs/common'
import { /*文档*/ ApiTags, ApiOperation, ApiOkResponse, ApiProperty, ApiExtraModels } from '@nestjs/swagger'
import { JwtService } from '@nestjs/jwt'
import dayjs from 'dayjs' // const dayjs = require('dayjs')
import { Api_public } from '@src/App_Auth'
import { PrismaClient, tb_test1 as tb_test1 } from '@prisma/client'

import { VO } from '@src/VO_Dynamic' // VO

import { db } from '@src/App_Prisma'

// 用户数据DTO
class Dto_one2 {
  @ApiProperty({ description: '用户ID', example: 1 })
  id: number

  @ApiProperty({ description: '手机号', example: '151603151101757503923' })
  phone: string

  @ApiProperty({ description: '密码', example: '123456' })
  password: string

  @ApiProperty({ description: '创建时间', example: '2025-09-10T11:32:03.273Z' })
  created_at: Date

  @ApiProperty({ description: '更新时间', example: '2025-09-10T11:32:03.273Z' })
  updated_at: Date
}


@Api_public()
@ApiTags('test1/App_test2')
@Controller('test1/App_test2')
export class App_test2 {
  @Get('one1')
  @ApiOkResponse({ description: '用户分页功能', type: VO(Dto_one2, 'one222') })
  async one1() {
    const one = await db.tb_test1.findFirst({ where: { password: '123456' } })

    return { code: 200, msg: '成功', result: { one22: one } }
  }
}
