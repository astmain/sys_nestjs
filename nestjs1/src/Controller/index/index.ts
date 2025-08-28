import { Get, Post, Controller, Module } from '@nestjs/common'
import { Dec_public } from '@src/AppAuthorized'

@Dec_public()
@Controller()
export class index {
  @Get()
  async api() {
    return { code: 200, msg: '首页api' }
  }

  @Get('index')
  async index() {
    return { code: 200, msg: '首页index' }
  }

  @Get('home')
  async home() {
    return { code: 200, msg: '首页home' }
  }

  @Post('post')
  async post() {
    return { code: 200, msg: '首页post' }
  }
}

@Module({
  controllers: [index],
  providers: [],
})
export class index_module {}
