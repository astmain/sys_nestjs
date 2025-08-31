import { Get, Post, Controller, Module, Res, Param, Query } from '@nestjs/common'
import { ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger'
import { ParseIntPipe } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

// 自定义包
import { Dec_public } from '@src/AppAuthorized'
import { AppController, ApiGet } from '@src/Plugins/AppController'

@Dec_public()
@ApiTags('模型商城')
@Controller("model_shop")
export class model_shop extends AppController {
  @ApiGet('test_delete', '模型商城-删除-id')
  @ApiQuery({ name: 'id', description: '模型商城id', required: true, type: Number, example: 1 })
  async test_delete(@Query('id', ParseIntPipe) id: number) {
    console.log('test_delete---id:', id, typeof id)
    return { code: 200, msg: '成功:删除', result: {} }
  }
}

@Module({
  controllers: [model_shop],
  providers: [],
})
export class model_shop_module {}
