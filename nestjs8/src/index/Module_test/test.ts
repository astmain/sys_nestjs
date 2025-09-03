import { ParseIntPipe } from '@nestjs/common'

import { IsString, IsNumber, IsArray } from 'class-validator'
import { JwtService } from '@nestjs/jwt'

import { AppController, Query, ApiTags, ApiPost, Controller, Module, ApiBody, Req, ApiConsumes, Body, ApiParam, ApiQuery, ApiProperty } from '@src/Plugins/AppController'
import * as path from 'path'

// 自定义包
import { Dec_public } from '@src/AppAuthorized'

export const form_urlencoded = {
  schema: {
    type: 'object',
    required: ['token'],
    properties: {
      token: { description: 'token字符', type: 'string', format: 'string' },
    },
  },
}

class test_token_dto {
  @ApiProperty({ description: 'token字符', example: '1234567890' })
  @IsString()
  token: string
}

class test_token_generate_dto {
  @ApiProperty({ description: 'username字符', example: '15160315110' })
  @IsString()
  username: string

  @ApiProperty({ description: 'phone字符', example: '15160315110' })
  @IsString()
  phone: string

  @ApiProperty({ description: 'id字符', example: 1 })
  @IsNumber()
  id: number

  @ApiProperty({ description: 'roleIds字符', example: [] })
  @IsArray()
  roleIds: number[]

  @ApiProperty({ description: 'iat_time字符', example: '2025-09-02 19:47:02' })
  @IsString()
  iat_time: string

  @ApiProperty({ description: 'exp_time字符', example: '2053-01-17 19:47:02' })
  @IsString()
  exp_time: string
}

@ApiTags('测试')
@Dec_public()
@Controller()
export class test extends AppController {
  @ApiPost('token_parse', '测试token解析')
  // @ApiQuery(form_urlencoded)
  @ApiBody(form_urlencoded)
  async test_token(@Query() body: test_token_dto, @Req() req: any) {
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

    const payload={
      username: body.username,
      phone: body.phone,
      id: body.id,
      roleIds: body.roleIds,
      iat: this.dayjs().unix(),
      exp: this.dayjs().add(9999, 'day').unix(),
      iat_time: this.dayjs(this.dayjs().unix() * 1000).format('YYYY-MM-DD HH:mm:ss'),
      exp_time: this.dayjs(this.dayjs().add(9999, 'day').unix() * 1000).format('YYYY-MM-DD HH:mm:ss'),
    }

    const my_jwt_service = new JwtService()
    const token = my_jwt_service.sign(payload, { secret: process.env.VITE_jwt_secret })
    return { code: 200, msg: '', result: { VITE_jwt_secret: process.env.VITE_jwt_secret, token, payload } }

    // return { code: 200, msg: '', result: body }
  }
}

@Module({
  controllers: [test],
  providers: [],
})
export class Module_test {}
