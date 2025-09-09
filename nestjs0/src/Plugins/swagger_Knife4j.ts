import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger' //怎么设置addGlobalParameters
import { knife4jSetup } from 'nest-knife4j'
import { ResponseVo } from '@src/index/Module_test/aaa_dto/ResponseVo'
import { PageVo } from '@src/index/Module_test/aaa_dto/PageVo'
import { UserResponseDto } from '@src/index/Module_test/aaa_dto/UserResponseDto'

// 自定义

//  配置:swagger文档nest-knife4j

export async function swagger_Knife4j(app) {
  // 参数
  const version = process.env.VITE_env_path + ''
  const name = process.env.VITE_project_name + `(文档)${version}`
  const token = process.env.VITE_jwt_token_swagger

  const description = process.env.VITE_project_remark + ''

  // 生产swagger文档
  const config = new DocumentBuilder()
    .setTitle(name)
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

  const document = SwaggerModule.createDocument(app, config, {extraModels: [ResponseVo, PageVo, UserResponseDto]})
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
