import { ParseIntPipe } from '@nestjs/common'

import { IsString, IsNumber, IsArray } from 'class-validator'
import { JwtService } from '@nestjs/jwt'

import { AppController, Query, ApiTags, ApiPost, Controller, ApiBody, Req, ApiConsumes, Body, ApiParam, ApiQuery, ApiProperty } from '@src/Plugins/AppController'
import * as path from 'path'

// 自定义dto
import { test_token_generate_dto } from './dto/token_generate'
import { token_parse } from './dto/token_parse'
import { test_return } from './dto/test_return'
// 自定义包
import { Dec_public } from '@src/AppAuthorized'

import { ApiExtraModels, ApiOkResponse, ApiOperation, getSchemaPath } from '@nestjs/swagger'

export const form_urlencoded = {
  schema: {
    type: 'object',
    required: ['token'],
    properties: {
      token: { description: 'token字符', type: 'string', format: 'string' },
    },
  },
}

interface ResultVO<T> {
  code: number // 业务状态码，比如 0 表示成功，非 0 表示各种错误
  msg: string // 提示信息，比如 "成功"、"参数错误"
  result: T // 具体数据，泛型，可以是 UserVO、ListVO<UserVO> 等
}

class ResultBaseVO {
  @ApiProperty({ example: 0, description: '业务状态码,0 表示成功' })
  code: number

  @ApiProperty({ example: '成功', description: '提示信息' })
  message: string
}

@ApiTags('测试')
@Dec_public()
@Controller()
@ApiExtraModels(ResultBaseVO, test_return) // 声明这些模型会被引用
export class test extends AppController {
  @ApiPost('token_parse', '测试token解析')
  // @ApiQuery(form_urlencoded)
  @ApiBody(form_urlencoded)
  async token_parse(@Query() body: token_parse, @Req() req: any) {
    // 参数
    let { token } = body
    // 判断token是否存在空格
    let is_trim = ''
    if (token.includes(' ')) {
      token = token.replace(/\s/g, '')
      is_trim = '存在空格'
    }
    console.log(`参数---token:`)

    console.log(`密钥---VITE_jwt_secret:`, process.env.VITE_jwt_secret)
    const my_jwt_service = new JwtService()

    const payload = my_jwt_service.verify(token, { secret: process.env.VITE_jwt_secret })
    console.log(`解析---payload:`, payload)

    // 计算过期时间
    const day1 = this.dayjs(payload.iat * 1000).format('YYYY-MM-DD HH:mm:ss')
    console.log(`开始时间---day1:`, day1)

    const day2 = this.dayjs(payload.exp * 1000).format('YYYY-MM-DD HH:mm:ss')
    console.log(`结束时间---day2:`, day2)

    return { code: 200, msg: '成功:测试token' + is_trim, result: { VITE_jwt_secret: process.env.VITE_jwt_secret, is_trim, day1, day2, payload } }
  }

  @ApiPost('token_generate', '测试token生产')
  async token_generate(@Body() body: test_token_generate_dto, @Req() req: any) {
    console.log(`body---token_generate:`, body)
    // const my_jwt_service = new JwtService()
    // const iat = this.dayjs().unix()
    // const exp = this.dayjs().add(9999, 'day').unix()
    // console.log(`iat:`, iat)
    // console.log(`exp:`, exp)

    // const iat_time = this.dayjs(iat * 1000).format('YYYY-MM-DD HH:mm:ss')
    // const exp_time = this.dayjs(exp * 1000).format('YYYY-MM-DD HH:mm:ss')
    // console.log(`iat_time:`, iat_time)
    // console.log(`exp_time:`, exp_time)

    // const payload = { username: '15160315110', phone: '15160315110', id: 1, roleIds: [], iat, exp }
    // const token = my_jwt_service.sign(payload, { secret: process.env.VITE_jwt_secret })
    // return { code: 200, msg: '', result: { VITE_jwt_secret: process.env.VITE_jwt_secret, token, payload, iat, exp, iat_time, exp_time } }

    // const payload1 = {
    //   username: body.username,
    //   phone: body.phone,
    //   id: body.id,
    //   roleIds: body.roleIds,
    //   iat: this.dayjs().unix(),
    //   exp: this.dayjs().add(9999, 'day').unix(),
    //   iat_time: this.dayjs(this.dayjs().unix() * 1000).format('YYYY-MM-DD HH:mm:ss'),
    //   exp_time: this.dayjs(this.dayjs().add(9999, 'day').unix() * 1000).format('YYYY-MM-DD HH:mm:ss'),
    // }

    const payload2 = {
      // 上传基础
      username: body.username,
      phone: body.phone,
      id: body.id,
      roleIds: body.roleIds,
      user_id: body.id,
      department: body.department,
      iat: this.dayjs().unix(),
      exp: this.dayjs().add(9999, 'day').unix(),
      roles: body.roleIds,
      extra: { checked: true },
      // 额外
      iat_time: this.dayjs(this.dayjs().unix() * 1000).format('YYYY-MM-DD HH:mm:ss'),
      exp_time: this.dayjs(this.dayjs().add(9999, 'day').unix() * 1000).format('YYYY-MM-DD HH:mm:ss'),
    }

    const my_jwt_service = new JwtService()
    const token = my_jwt_service.sign(payload2, { secret: process.env.VITE_jwt_secret })
    return { code: 200, msg: 'payload2:', result: { VITE_jwt_secret: process.env.VITE_jwt_secret, token, payload2 } }

    // return { code: 200, msg: '', result: body }
  }

  @ApiPost('test_return', 'test_return')
  async test_return(@Body() body: test_return, @Req() req: any): Promise<ResultVO<test_return>> {
    console.log(`body---test_return:`, body)
    const result = {
      name: '111',
    }

    return { code: 200, msg: 'test_return', result: result }
  }

  @ApiPost('test_response', 'test_response')
  @ApiOkResponse({
    description: '成功返回用户信息',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ResultBaseVO) }, // 继承 code/message
        {
          type: 'object',
          properties: {
            result: { $ref: getSchemaPath(test_return) }, // data 泛型位
            name: { type: 'string', example: '111' },
          },
        },
      ],
    },
  })
  async test_response(@Body() body: test_return, @Req() req: any): Promise<ResultVO<test_return>> {
    console.log(`body---test_response:`, body)
    const result = {
      name: '111',
    }
    return { code: 200, msg: 'test_response', result: result }
  }
}




import {  Module } from '@src/Plugins/AppController'
@Module({
  controllers: [test],
  providers: [],
})
export class Module_test {}
