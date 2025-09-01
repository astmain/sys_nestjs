// 通用包
import { AppController, ApiGet, ApiPost, ApiQuery, Controller, Module, Query, Body, ApiTags, ParseIntPipe } from '@src/Plugins/AppController'

// 自定义包
import { Dec_public } from '@src/AppAuthorized'

// 自定义dto
import * as dto from './dto'

@ApiTags('模型商城')
@Dec_public()
@Controller()
export class model_shop extends AppController {
  @ApiPost('create_model_shop', '创建模型')
  async create_model_shop(@Body() body: dto.create_model_shop) {
    console.log('create_model_shop---body:', body)
    const data = await this.db.tb_model_shop.create({
      data: {
        model_id: body.model_id,
        title: body.title,
        description: body.description,
        author_name: body.author_name,
        author_id: body.author_id,
        count_collect: body.count_collect,
        count_download: body.count_download,
        price_30: body.price_30,
        price_all: body.price_all,
      },
    })
    return { code: 200, msg: '成功:创建模型', result: data }
  }

  @ApiPost('update_model_shop', '更新模型')
  async update_model_shop(@Body() body: dto.update_model_shop) {
    console.log('update_model_shop---body:', body)
    const data = await this.db.tb_model_shop.update({
      where: { id: body.id },
      data: {
        model_id: body.model_id,
        title: body.title,
        description: body.description,
        author_name: body.author_name,
        author_id: body.author_id,
        count_collect: body.count_collect,
        count_download: body.count_download,
        price_30: body.price_30,
        price_all: body.price_all,
      },
    })
    return { code: 200, msg: '成功:更新模型', result: data }
  }

  @ApiPost('find_model_shop', '查询模型')
  async find_model_shop(@Body() body: dto.find_model_shop) {
    console.log('find_model_shop---body:', body)
    const data = await this.db.tb_model_shop.findMany({
      where: {
        title: body.title || undefined,
        author_name: body.author_name || undefined,
      },
    })
    console.log('find_model_shop---data:', data)
    return { code: 200, msg: '成功:查询模型', result: data }
  }

  @ApiGet('delete_model_shop', '删除模型')
  @ApiQuery({ name: 'id', description: '删除id', required: true, type: Number, example: 1 })
  async delete_model_shop(@Query('id', ParseIntPipe) id: number) {
    console.log('delete_model_shop---id:', id, typeof id)
    const data = await this.db.tb_model_shop.deleteMany({ where: { id: id } })
    return { code: 200, msg: '成功:删除模型', result: data }
  }

  @ApiGet('get_model_shop_by_id', '根据ID获取模型')
  @ApiQuery({ name: 'id', description: '模型id', required: true, type: Number, example: 1 })
  async get_model_shop_by_id(@Query('id', ParseIntPipe) id: number) {
    console.log('get_model_shop_by_id---id:', id, typeof id)
    const data = await this.db.tb_model_shop.findUnique({ where: { id: id } })
    return { code: 200, msg: '成功:获取模型', result: data }
  }
}

@Module({
  controllers: [model_shop],
  providers: [],
})
export class Module_model_shop {}
