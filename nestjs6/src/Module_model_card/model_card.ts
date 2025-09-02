// 基础包
// 通常要使用的包(已经封装置AppController中,可以直接使用,减少import的容易引入)
import { AppController, ApiGet, ApiPost, ApiQuery, Controller, Module, Query, Body, ApiTags, ParseIntPipe } from '@src/Plugins/AppController'

// 开放接口
// 装饰器,开放接口,不需要验证
import { Dec_public } from '@src/AppAuthorized'

// 自定义dto
// dto  * as dto 统一到处方便使用
import * as dto from './dto'

@ApiTags('模型购物车')
@Dec_public()
@Controller() //控制器层,定义接口,直接写业务代码,省略service层,更方便开发
export class model_card extends AppController {
  @ApiPost('create_model_card', '新增-模型购物车')
  async create_model_card(@Body() body: dto.create_model_card) {
    console.log('create_model_card---body:', body)
    
    // 检查商品是否存在
    const product = await this.db.tb_model_product.findUnique({
      where: { id: body.product_id }
    })
    if (!product) {
      return { code: 400, msg: '失败:商品不存在', result: null }
    }

    // 检查是否已经在购物车中
    const existingCart = await this.db.tb_model_cart.findUnique({
      where: { 
        user_id_product_id: {
          user_id: body.user_id,
          product_id: body.product_id
        }
      }
    })
    if (existingCart) {
      return { code: 400, msg: '失败:商品已在购物车中', result: null }
    }

    const data = await this.db.tb_model_cart.create({
      data: { 
        user_id: body.user_id, 
        product_id: body.product_id
      },
    })
    return { code: 200, msg: '成功:新增-模型购物车', result: data }
  }

  @ApiPost('update_model_card', '更新-模型购物车')
  async update_model_card(@Body() body: dto.update_model_card) {
    console.log('update_model_card---body:', body)
    const data = await this.db.tb_model_cart.update({
      where: { id: body.id },
      data: { 
        user_id: body.user_id, 
        product_id: body.product_id
      },
    })
    return { code: 200, msg: '成功:更新-模型购物车', result: data }
  }

  @ApiPost('find_list_model_card', '查询-模型购物车-列表')
  async find_list_model_card(@Body() body: dto.find_list_model_card) {
    console.log('find_list_model_card---body:', body)
    const list = await this.db.tb_model_cart.findMany({
      where: { user_id: body.user_id },
      include: {
        product: true // 包含商品信息
      },
      skip: (body.page_index - 1) * body.page_size,
      take: body.page_size,
      orderBy: { [body.order_by]: body.order_type } as any,
    })
    const count = await this.db.tb_model_cart.count({ 
      where: { user_id: body.user_id } 
    })
    const page_total = Math.ceil(count / body.page_size)
    const pagination = { page_index: body.page_index, page_size: body.page_size, count_total: count, page_total: page_total }
    const result = { list, pagination }
    console.log('find_list_model_card---data:', result)
    return { code: 200, msg: '成功:查询-模型购物车-列表', result: result }
  }

  @ApiPost('find_info_model_card', '查询-模型购物车-详情')
  async find_info_model_card(@Body() body: dto.find_info_model_card) {
    console.log('find_info_model_card---body:', body)
    const data = await this.db.tb_model_cart.findUnique({ 
      where: { id: body.id },
      include: {
        product: true // 包含商品信息
      }
    })
    console.log('find_info_model_card---data:', data)
    return { code: 200, msg: '成功:查询-模型购物车-详情', result: data }
  }

  @ApiGet('delete_model_card', '删除-模型购物车-id')
  @ApiQuery({ name: 'id', description: '删除-id', required: true, type: String, example: 'cuid_string' })
  async delete_model_card(@Query('id') id: string) {
    console.log('delete_model_card---id:', id, typeof id)
    const data = await this.db.tb_model_cart.delete({ where: { id } })
    return { code: 200, msg: '成功:删除-模型购物车-id', result: data }
  }

  @ApiGet('clear_model_card', '清空-用户购物车')
  @ApiQuery({ name: 'user_id', description: '用户id', required: true, type: Number, example: 1 })
  async clear_model_card(@Query('user_id', ParseIntPipe) user_id: number) {
    console.log('clear_model_card---user_id:', user_id, typeof user_id)
    const data = await this.db.tb_model_cart.deleteMany({ where: { user_id } })
    return { code: 200, msg: '成功:清空-用户购物车', result: data }
  }
}

// 模块层直接写在当前文件中,导入控制器层,方便其他模块导入使用
@Module({
  controllers: [model_card],
  providers: [],
})
export class Module_model_card {}
