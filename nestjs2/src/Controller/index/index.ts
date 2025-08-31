import { Get, Post, Controller, Module, Res } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'

// 自定义包
import { Dec_public } from '@src/AppAuthorized'
import { check_env } from '@src/Plugins/check_env'

@Dec_public()
@Controller()
export class index {
  @Get()
  @ApiOperation({ summary: '首页api' })
  async api() {
    const { env_curr_web_description } = check_env()
    return { code: 200, msg: '首页api', result: { env_curr_web_description } }
  }

  // 重定向到swagger文档
  @Get('doc')
  @ApiOperation({ summary: '访问doc重定向到开发文档' })
  async doc(@Res() res) {
    return res.redirect('http://127.0.0.1:6666/doc.html')
  }

  // 重定向到swagger文档
  @Get('docs')
  @ApiOperation({ summary: '方法docs重定向到开发文档' })
  async docs(@Res() res) {
    return res.redirect('http://127.0.0.1:6666/doc.html')
  }

  @Get('index')
  @ApiOperation({ summary: '接口index' })
  async index() {
    const time = new Date().toLocaleString()
    return { code: 200, msg: '接口index', result: { time } }
  }

  @Get('home')
  @ApiOperation({ summary: '接口home' })
  async home() {
    const time = new Date().toLocaleString()
    return { code: 200, msg: '接口home', result: { time } }
  }

  @Post('post')
  @ApiOperation({ summary: '接口post' })
  async post() {
    const time = new Date().toLocaleString()
    return { code: 200, msg: '接口post', result: { time } }
  }
}

@Module({
  controllers: [index],
  providers: [],
})
export class index_module {}
