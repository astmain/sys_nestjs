import { NestFactory } from '@nestjs/core'
import { AppModule } from './AppModule'
import { Plugins } from './Plugins'
import * as bodyParser from 'body-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await Plugins.filter_cors(app) // 配置跨域
  await Plugins.swagger_Knife4j(app) // 配置swagger
  await app.listen(Number(process.env.PORT) || 3000)
  console.log(`
    服务启动:
    首页页面       http://127.0.0.1:${Number(process.env.PORT)}
    文档路径       http://127.0.0.1:${Number(process.env.PORT)}/doc.html
    文档路径       https://back.oss.yun3d.com/doc.html       

    测试页面:      
    运行           pnpm --filter server_oss_demo dev 

    环境变量:
    环境          ${process.env.NAME}
    端口           ${process.env.PORT}
    数据库连接     ${process.env.URL_postgresql}
    资源文件夹     ${process.env.filestore}
    `)
}

bootstrap()
