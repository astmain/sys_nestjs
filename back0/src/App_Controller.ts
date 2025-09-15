import { /*接口*/ Controller, Get, Inject } from '@nestjs/common'
import { /*文档*/ ApiTags, ApiOperation, ApiOkResponse, ApiProperty } from '@nestjs/swagger'
import { JwtService } from '@nestjs/jwt'
import dayjs from 'dayjs' // const dayjs = require('dayjs')
import { Api_public } from './App_Auth'
import { PrismaClient, tb_test1 as tb_test1 } from '@prisma/client'

import { db } from './App_Prisma'

// 通用响应基础类
class Base_Response_Dto<T = any> {
  @ApiProperty({ description: '状态码', example: 200 })
  code: number

  @ApiProperty({ description: '响应消息', example: '操作成功' })
  msg: string

  @ApiProperty({ description: '响应数据' })
  result: T

  constructor(code: number = 200, msg: string = '操作成功', result: T = null as T) {
    this.code = code
    this.msg = msg
    this.result = result
  }
}

// 用户响应DTO
class User_Response_Dto {
  @ApiProperty({ description: '用户ID', example: 18 })
  id: number

  @ApiProperty({ description: '手机号', example: '151603151101757435176' })
  phone: string

  @ApiProperty({ description: '密码', example: '123456' })
  password: string

  @ApiProperty({ description: '创建时间', example: '2025-09-09T16:26:16.793Z' })
  created_at: Date

  @ApiProperty({ description: '更新时间', example: '2025-09-09T16:26:16.793Z' })
  updated_at: Date
}

// Pages_Result_Dto,Pages_Response_Dto 抽象成一个类 泛型 让代码更通用,代码写在App_Controller.ts
// 通用分页结果DTO - 使用泛型，支持任意数据类型
class Pages_Result_Dto<T = any> {
  @ApiProperty({ description: '数据列表', type: [Object] })
  data: T[]

  @ApiProperty({ description: '总数量', example: 0 })
  total: number

  @ApiProperty({ description: '当前页码', example: 1 })
  page: number

  @ApiProperty({ description: '每页数量', example: 10 })
  page_size: number

  @ApiProperty({ description: '总页数', example: 1 })
  total_pages: number

  constructor(data: T[] = [], total: number = 0, page: number = 1, page_size: number = 10) {
    this.data = data
    this.total = total
    this.page = page
    this.page_size = page_size
    this.total_pages = Math.ceil(total / page_size)
  }
}

// 通用分页响应DTO - 使用泛型
class Pages_Response_Dto<T = any> extends Base_Response_Dto<Pages_Result_Dto<T>> {
  @ApiProperty({ description: '响应数据', type: Pages_Result_Dto })
  result: Pages_Result_Dto<T>

  constructor(msg: string = '分页功能', data: T[] = [], total: number = 0, page: number = 1, page_size: number = 10) {
    super(200, msg, new Pages_Result_Dto(data, total, page, page_size))
    this.result = new Pages_Result_Dto(data, total, page, page_size)
  }
}

// 用户分页结果DTO - 继承通用分页类
class User_Pages_Result_Dto extends Pages_Result_Dto<User_Response_Dto> {
  @ApiProperty({ description: '用户列表', type: [User_Response_Dto] })
  data: User_Response_Dto[]

  constructor(users: User_Response_Dto[] = [], total: number = 0, page: number = 1, page_size: number = 10) {
    super(users, total, page, page_size)
    this.data = users
  }
}

// 用户分页响应DTO - 继承通用分页响应类
class User_Pages_Response_Dto extends Pages_Response_Dto<User_Response_Dto> {
  @ApiProperty({ description: '响应数据', type: User_Pages_Result_Dto })
  result: User_Pages_Result_Dto

  constructor(msg: string = '用户分页功能', users: User_Response_Dto[] = [], total: number = 0, page: number = 1, page_size: number = 10) {
    super(msg, users, total, page, page_size)
    this.result = new User_Pages_Result_Dto(users, total, page, page_size)
  }
}

// 为了支持 Swagger 文档，创建具体的类型别名
type User_Pages_Response_Type = Pages_Response_Dto<Pages_Result_Dto<User_Response_Dto>>

@ApiTags('首页')
@Api_public()
@Controller()
export class App_Controller {
  @ApiOperation({ summary: 'token生成' })
  @Get('token_make')
  token_make() {
    const payload2 = {
      // 基础数据
      username: '15160315110',
      phone: '15160315110',
      id: 1,
      user_id: 1,
      roleIds: [],
      department: [{ id: 2 }],
      iat: dayjs().unix(),
      exp: dayjs().add(9999, 'day').unix(),
      roles: [],
      extra: { checked: true },
      // 额外
      iat_time: dayjs(dayjs().unix() * 1000).format('YYYY-MM-DD HH:mm:ss'),
      exp_time: dayjs(dayjs().add(9999, 'day').unix() * 1000).format('YYYY-MM-DD HH:mm:ss'),
    }
    // console.log(`payload2:`, payload2)
    const my_jwt_service = new JwtService()
    const token = my_jwt_service.sign(payload2, { secret: process.env.VITE_jwt_secret })
    return new Base_Response_Dto(200, 'payload2:目前固定写数据', { VITE_jwt_secret: process.env.VITE_jwt_secret, token, payload2 })
  }

  @Get('pages')
  @ApiOperation({ summary: '用户分页功能' })
  @ApiOkResponse({ description: '用户分页功能', type: User_Pages_Response_Dto })
  async pages(): Promise<User_Pages_Response_Dto> {
    const page = 1
    const page_size = 10
    const skip = (page - 1) * page_size
    const [users, total] = await Promise.all([
      db.tb_test1.findMany({
        skip,
        take: page_size,
        orderBy: { created_at: 'desc' },
      }),
      db.tb_test1.count({}),
    ])

    return new User_Pages_Response_Dto('用户分页功能', users, total, page, page_size)
  }

  // 通用分页接口示例 - 支持嵌套泛型类型
  @Get('generic_pages')
  @ApiOperation({ summary: '通用分页功能' })
  @ApiOkResponse({ description: '通用分页功能', type: Pages_Response_Dto })
  async generic_pages(): Promise<Pages_Response_Dto<User_Response_Dto>> {
    const page = 1
    const page_size = 10
    const skip = (page - 1) * page_size
    const [data, total] = await Promise.all([
      db.tb_test1.findMany({
        skip,
        take: page_size,
        orderBy: { created_at: 'desc' },
      }),
      db.tb_test1.count({}),
    ])

    return new Pages_Response_Dto('通用分页功能', data, total, page, page_size)
  }

  // 嵌套泛型类型示例
  @Get('nested_generic_pages')
  @ApiOperation({ summary: '嵌套泛型分页功能' })
  @ApiOkResponse({ description: '嵌套泛型分页功能', type: Pages_Response_Dto })
  async nested_generic_pages(): Promise<Pages_Response_Dto<Pages_Result_Dto<User_Response_Dto>>> {
    const page = 1
    const page_size = 10
    const skip = (page - 1) * page_size
    const [users, total] = await Promise.all([
      db.tb_test1.findMany({
        skip,
        take: page_size,
        orderBy: { created_at: 'desc' },
      }),
      db.tb_test1.count({}),
    ])

    // 创建嵌套的分页结果
    const nested_result = new Pages_Result_Dto(users, total, page, page_size)
    return new Pages_Response_Dto('嵌套泛型分页功能', [nested_result], 1, page, page_size)
  }

  @Get('save_user')
  @ApiOperation({ summary: '保存用户' })
  @ApiOkResponse({ description: '保存用户', type: Base_Response_Dto })
  async save_user() {
    const one = await db.tb_test1.create({
      data: {
        phone: '15160315110' + dayjs().unix(),
        password: '123456',
      },
    })

    return new Base_Response_Dto(200, '保存用户', { one })
  }

  @Get('save_tb_test1')
  @ApiOperation({ summary: '保存tb_test1' })
  @ApiOkResponse({ description: '保存tb_test1', type: Base_Response_Dto })
  async save_tb_test1() {
    await db.tb_test1.deleteMany()
    const one = await db.tb_test1.createMany({
      data: [
        { phone: '1-1', password: '123456' },
        { phone: '1-2', password: '123456' },
        { phone: '1-3', password: '123456' },
        { phone: '1-4', password: '123456' },
        { phone: '1-5', password: '123456' },
        { phone: '1-6', password: '123456' },
        { phone: '1-7', password: '123456' },
        { phone: '1-8', password: '123456' },
        { phone: '1-9', password: '123456' },
        { phone: '1-10', password: '123456' },
        { phone: '2-1', password: '123456' },
        { phone: '2-2', password: '123456' },
        { phone: '2-3', password: '123456' },
        { phone: '2-4', password: '123456' },
        { phone: '2-5', password: '123456' },
        { phone: '2-6', password: '123456' },
        { phone: '2-7', password: '123456' },
        { phone: '2-8', password: '123456' },
        { phone: '2-9', password: '123456' },
        { phone: '2-10', password: '123456' },
        { phone: '3-1', password: '123456' },
        { phone: '3-2', password: '123456' },
        { phone: '3-3', password: '123456' },
        { phone: '3-4', password: '123456' },
        { phone: '3-5', password: '123456' },
        { phone: '3-6', password: '123456' },
        { phone: '3-7', password: '123456' },
        { phone: '3-8', password: '123456' },
        { phone: '3-9', password: '123456' },
        { phone: '3-10', password: '123456' },
      ],
    })

    return { code: 200, msg: '保存tb_test1', result: one }
  }
}
