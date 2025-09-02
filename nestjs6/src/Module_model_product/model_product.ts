// 基础包
// 通常要使用的包(已经封装置AppController中,可以直接使用,减少import的容易引入)
import { AppController, ApiGet, ApiPost, ApiQuery, Controller, Module, Query, Body, ApiTags, ParseIntPipe } from '@src/Plugins/AppController'

// 开放接口
// 装饰器,开放接口,不需要验证
import { Dec_public } from '@src/AppAuthorized'

// 自定义dto
// dto  * as dto 统一到处方便使用
import * as dto from './dto'

@ApiTags('模型商品')
@Dec_public()
@Controller() //控制器层,定义接口,直接写业务代码,省略service层,更方便开发
export class model_product extends AppController {
  @ApiPost('create_model_product', '新增-模型商品')
  async create_model_product(@Body() body: dto.create_model_product) {
    console.log('create_model_product---body:', body)
    const data = await this.db.tb_model_product.create({
      data: { 
        title: body.title, 
        remark: body.remark || '', 
        price: body.price, 
        is_public: body.is_public !== undefined ? body.is_public : true 
      },
    })
    return { code: 200, msg: '成功:新增-模型商品', result: data }
  }

  @ApiPost('update_model_product', '更新-模型商品')
  async update_model_product(@Body() body: dto.update_model_product) {
    console.log('update_model_product---body:', body)
    const data = await this.db.tb_model_product.update({
      where: { id: body.id },
      data: { 
        title: body.title, 
        remark: body.remark, 
        price: body.price, 
        is_public: body.is_public 
      },
    })
    return { code: 200, msg: '成功:更新-模型商品', result: data }
  }

  @ApiPost('find_list_model_product', '查询-模型商品-列表')
  async find_list_model_product(@Body() body: dto.find_list_model_product) {
    console.log('find_list_model_product---body:', body)
    const list = await this.db.tb_model_product.findMany({
      where: { 
        title: { contains: body.title || '' },
        is_public: true // 只查询公开的商品
      },
      skip: (body.page_index - 1) * body.page_size,
      take: body.page_size,
      orderBy: { [body.order_by]: body.order_type } as any,
    })
    const count = await this.db.tb_model_product.count({ 
      where: { 
        title: { contains: body.title || '' },
        is_public: true 
      } 
    })
    const page_total = Math.ceil(count / body.page_size)
    const pagination = { page_index: body.page_index, page_size: body.page_size, count_total: count, page_total: page_total }
    const result = { list, pagination }
    console.log('find_list_model_product---data:', result)
    return { code: 200, msg: '成功:查询-模型商品-列表', result: result }
  }

  @ApiPost('find_info_model_product', '查询-模型商品-详情')
  async find_info_model_product(@Body() body: dto.find_info_model_product) {
    console.log('find_info_model_product---body:', body)
    const data = await this.db.tb_model_product.findUnique({ where: { id: body.id } })
    console.log('find_info_model_product---data:', data)
    return { code: 200, msg: '成功:查询-模型商品-详情', result: data }
  }

  @ApiGet('delete_model_product', '删除-模型商品-id')
  @ApiQuery({ name: 'id', description: '删除-id', required: true, type: String, example: 'cuid_string' })
  async delete_model_product(@Query('id') id: string) {
    console.log('delete_model_product---id:', id, typeof id)
    const data = await this.db.tb_model_product.delete({ where: { id } })
    return { code: 200, msg: '成功:删除-模型商品-id', result: data }
  }
}

// 模块层直接写在当前文件中,导入控制器层,方便其他模块导入使用
@Module({
  controllers: [model_product],
  providers: [],
})
export class Module_model_product {}
