import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger' //怎么设置addGlobalParameters
import { knife4jSetup } from 'nest-knife4j'

// 自定义

//  配置:swagger文档nest-knife4j
export async function swagger_Knife4j(app, title = '开发文档') {
  const config = new DocumentBuilder()
    .setTitle(title)
    .setDescription('文档描述:测试使用')
    .setVersion('0.0.1')
    .addServer('1111', 'Local environment')
    .addGlobalParameters({
      name: 'token',
      in: 'header',
      description: 'token',
      required: true,
      schema: {
        type: 'string',
        default: process.env.jwt_token_swagger,
        // default: '',
      },
    })
    .build()

  const document = SwaggerModule.createDocument(app, config, {})
  SwaggerModule.setup('/api/swagger', app, document)
  knife4jSetup(app, [
    {
      name: title,
      url: `/api/swagger-json`,
      swaggerVersion: '1.0.0',
      location: `/api/swagger-json`,
    },
  ])
}
