import { NestFactory } from '@nestjs/core'
import { AppModule } from './AppModule'
import { Plugins } from './Plugins'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const { env_curr_back_description } = Plugins.check_env()
  await Plugins.filter_cors(app) // 配置跨域
  await Plugins.swagger_Knife4j(app) // 配置swagger
  await app.listen(Number(process.env.VITE_port))
  console.log('启动成功:', env_curr_back_description)
}

bootstrap()
