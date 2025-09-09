// 自定义包
import { Dec_public } from '@src/AppAuthorized'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { Controller, Get, Post } from '@nestjs/common'
import { AppController } from '@src/Plugins/AppController'
import { ResponseVo } from './aaa_dto/ResponseVo'
import { UserResponseDto } from './aaa_dto/UserResponseDto'

@ApiTags('测试')
@Dec_public()
@Controller()
export class test extends AppController {
  @Post('test_user')
  @ApiOperation({ summary: '测试用户接口', description: '获取用户信息测试接口' })
  @ApiResponse({
    status: 200,
    description: '成功获取用户信息',
    schema: {
      type: 'object',
      properties: {
        code: { type: 'number', example: 200, description: '状态码' },
        message: { type: 'string', example: '获取用户信息成功', description: '提示信息' },
        data: {
          type: 'object',
          description: '用户信息1',
          properties: {
            id: { type: 'number', example: 1, description: '用户ID' },
            username: { type: 'string', example: 'test_user', description: '用户名' },
            email: { type: 'string', example: 'test@example.com', description: '邮箱' },
            age: { type: 'number', example: 25, description: '年龄' },
          },
        },
      },
    },
  })
  async test_user() : Promise<ResponseVo<UserResponseDto>> {
    // 模拟用户数据
    const userData: UserResponseDto = {
      id: 1,
      username: 'test_user',
      email: 'test@example.com',
      age: 25,
    }

    // 使用统一的响应格式
    return ResponseVo.success(userData, '获取用户信息成功')
  }
}

import { Module } from '@src/Plugins/AppController'
@Module({
  controllers: [test],
  providers: [],
})
export class Module_test {}
