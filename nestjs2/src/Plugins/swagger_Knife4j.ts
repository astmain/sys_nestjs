import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger' //怎么设置addGlobalParameters
import { knife4jSetup } from 'nest-knife4j'

// 自定义

//  配置:swagger文档nest-knife4j

export async function swagger_Knife4j(app) {
  // 参数
  const name = process.env.PROJECT_name + '(文档)'
  const token = process.env.JWT_token_swagger
  const version = process.env.ENV_path + ''
  const description = process.env.PROJECT_remark + ''

  // 生产swagger文档
  const config = new DocumentBuilder()
    .setTitle(name)
    .setDescription('文档描述:测试使用')
    .setVersion(version)
    .setDescription(description)
    .addServer('1111', 'Local environment')
    .addGlobalParameters({
      name: 'token',
      in: 'header',
      description: 'token',
      required: true,
      schema: {
        type: 'string',
        default: token,
        // default: '',
      },
    })
    .build()

  const document = SwaggerModule.createDocument(app, config, {})
  SwaggerModule.setup('/api/swagger', app, document)
  knife4jSetup(app, [
    {
      name: name,
      url: `/api/swagger-json`,
      swaggerVersion: '1.0.0',
      location: `/api/swagger-json`,
    },
  ])
}
