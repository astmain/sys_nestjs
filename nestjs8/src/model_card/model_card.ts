// 基础包
import { AppController, ApiGet, ApiPost, ApiQuery, Controller, Module, Query, Body, ApiTags, ParseIntPipe, Req } from '@src/Plugins/AppController'

// 开放接口

import { permiss_check_user_id } from '@src/Plugins/permiss_check_user_id'

// 自定义dto
import { save_model_card } from './dto/save_model_card'
import { find_list_model_card } from './dto/find_list_model_card'

@ApiTags('模型购物车')
@Controller("model_api") 
export class model_card extends AppController {
  // ================================ 用户接口 ================================
  @ApiPost('save_model_card', '保存-模型购物车')
  async save_model_card(@Body() body: save_model_card, @Req() req: any) {
    // 得到req 的url
    const url = req.url
    permiss_check_user_id({ user_id: body.user_id, req_user_id: req.user_id, req_url: req.url })
    console.log('save_model_card---body:', body)
    const { id, ...createData } = body
    // 如果有id且不为空，则更新；否则创建新记录
    if (id && id.trim() !== '') {
      // 更新现有记录
      const data = await this.db.tb_model_cart.update({ where: { id }, data: createData })
      return { code: 200, msg: '成功:更新-模型购物车', result: data }
    } else {
      // 创建新记录
      const data = await this.db.tb_model_cart.create({ data: createData })
      return { code: 200, msg: '成功:创建-模型购物车', result: data }
    }
  }

  @ApiPost('find_list_model_card', '查询-模型购物车-列表')
  async find_list_model_card(@Body() body: find_list_model_card) {
    console.log('find_list_model_card---body:', body)
    const list = await this.db.tb_model_cart.findMany({
      where: { user_id: body.user_id, is_deleted: false },
      include: { product: true }, // 包含商品信息
      skip: (body.page_index - 1) * body.page_size,
      take: body.page_size,
      orderBy: { [body.order_by]: body.order_type } as any,
    })
    const count = await this.db.tb_model_cart.count({ where: { user_id: body.user_id, is_deleted: false } })
    const page_total = Math.ceil(count / body.page_size)
    const pagination = { page_index: body.page_index, page_size: body.page_size, count_total: count, page_total: page_total }
    const result = { list, pagination }
    console.log('find_list_model_card---data:', result)
    return { code: 200, msg: '成功:查询-模型购物车-列表', result: result }
  }

  @ApiGet('delete_model_card', '删除-模型购物车-id')
  @ApiQuery({ name: 'id', description: '删除-id', required: true, type: String, example: 'cuid_string' })
  async delete_model_card(@Query('id') id: string, @Req() req: any) {
    console.log('delete_model_card---id:', id, typeof id)
    const data = await this.db.tb_model_cart.update({ where: { id }, data: { is_deleted: true } })
    return { code: 200, msg: '成功:删除-模型购物车-id', result: data }
  }
}

@Module({
  controllers: [model_card],
  providers: [],
})
export class model_card_Module {}
