import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { knife4jSetup } from 'nestjs-knife4j2'

//  配置:swagger文档nest-knife4j
// import { patchNestJsSwagger } from 'nestjs-zod/openapi';
export async function swagger_knife4j2(app) {

    // 一定要在 createDocument 之前调用
    // patchNestJsSwagger();

  // Swagger API文档配置
  const config = new DocumentBuilder()
    .setTitle('api')
    .setDescription('基于NestJS的博客系统API文档')
    .setVersion('1.0')
    .addTag('项目介绍', '介绍')
    // .addTag('🟪test4_App_test1', '测试模块1 - 使用dto1_module1模型')
    // .addTag('🟪test4_App_test2', '测试模块2 - 使用dto1_module2模型')
    .addGlobalParameters({
      name: 'token',
      in: 'header',
      description: 'token',
      required: true,
      schema: {
        type: 'string',
        default: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjE1MTYwMzE1MTEwIiwicGhvbmUiOiIxNTE2MDMxNTExMCIsImlkIjoxLCJ1c2VyX2lkIjoxLCJyb2xlSWRzIjpbXSwiZGVwYXJ0bWVudCI6W3siaWQiOjJ9XSwiaWF0IjoxNzU3NDMyNDgxLCJleHAiOjI2MjEzNDYwODEsInJvbGVzIjpbXSwiZXh0cmEiOnsiY2hlY2tlZCI6dHJ1ZX19.dHfLiPbWiLKdu5NYvNPcXTnVWvaSq3XQsIzyj-v6bJ0',
        // default: '',
      },
    })

    .build()

  // 创建Swagger文档
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  // Knife4j2 增强文档配置
  await knife4jSetup(app, [
    {
      name: '博客系统API v1.0',
      url: '/api-json',
      swaggerVersion: '3.0',
      location: '/api-json',
    },
  ])
}
