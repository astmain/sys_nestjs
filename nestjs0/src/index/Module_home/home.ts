import { Get, Post, Controller, Module, Res } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

// 自定义包
import { Dec_public } from '@src/AppAuthorized'
import { check_env } from '@src/Plugins/check_env'

@ApiTags('首页')
@Dec_public()
@Controller()
export class home {
  @Get()
  @ApiOperation({ summary: '首页api' })
  async api() {
    // console.log('api---process.env:', process.env)
    const { env_curr_web_description } = check_env()
    console.log('env_curr_web_description', env_curr_web_description)
    return { code: 200, msg: '首页api', result: { env_curr_web_description } }
  }

  // 重定向到swagger文档
  @Get('doc')
  @ApiOperation({ summary: '访问doc重定向到开发文档' })
  async doc(@Res() res) {
    const url = process.env.VITE_url_app_run + '/doc.html'
    console.log('重定向到swagger文档url', url)
    return res.redirect(url)
  }

  // 重定向到swagger文档
  @Get('docs')
  @ApiOperation({ summary: '方法docs重定向到开发文档' })
  async docs(@Res() res) {
    const url = process.env.VITE_url_app_run + '/doc.html'
    console.log('重定向到swagger文档url', url)
    return res.redirect(url)
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
  controllers: [home],
  providers: [],
})
export class Module_home {}
