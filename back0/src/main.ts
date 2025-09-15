import 'module-alias/register' //使用Node.js中注册模块别名(全局)
import { NestFactory } from '@nestjs/core'
import { App_Module } from './App_Module'
import { ResponseInterceptor } from './common/interceptors/response.interceptor'
import { AllExceptionsFilter } from './common/filters/http-exception.filter'

import { ClassSerializerInterceptor } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

import { Plugins } from './Plugins/index'
async function bootstrap() {
  const app = await NestFactory.create(App_Module)

  // // 全局响应拦截器
  // app.useGlobalInterceptors(new ResponseInterceptor())

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      excludeExtraneousValues: true, // 让 @Expose/@Exclude 生效
    }),
  )

  // 全局异常过滤器
  // app.useGlobalFilters(new AllExceptionsFilter())

  await Plugins.filter_cors(app) // CORS配置(跨域请求)
  await Plugins.filter_dto(app) // dto配置(全局验证管道)
  await Plugins.swagger_knife4j2(app) //文档配置(swagger_knife4j2)

  const port = process.env.PORT || 3001
  await app.listen(port)

  console.log(`应用运行在: http://localhost:${port}`)
  console.log(`Knife4j2 API文档地址: http://localhost:${port}/doc.html`)
}

bootstrap()
