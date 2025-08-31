import { NestFactory } from '@nestjs/core'
import { AppModule } from './AppModule'
import { Plugins } from './Plugins'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const { env_curr, env_curr_description } = Plugins.check_env()
  await Plugins.filter_cors(app) // 配置跨域
  await Plugins.swagger_Knife4j(app) // 配置swagger
  await app.listen(Number(process.env.PORT))
  console.log('启动成功:', env_curr_description)
}

bootstrap()
