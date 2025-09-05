// 基础包
import { AppController, ApiGet, ApiPost, ApiQuery, Controller, Module, Query, Body, ApiTags, ParseIntPipe, Req } from '@src/Plugins/AppController'
// dto
import { create_model_order } from './dto/create_model_order'
import { find_list_model_order } from './dto/find_list_model_order'

@ApiTags('模型订单')
@Controller("model_api")
export class model_order extends AppController {
  @ApiPost('create_model_order', '新增-模型订单')
  async create_model_order(@Body() body: create_model_order, @Req() req: any) {
    console.log('create_model_order---body:', body)
    // 生成订单号
    const order_number = `model_${this.dayjs().format('YYYYMMDD_HHmmss')}_${Math.floor(100000 + Math.random() * 900000)}` // 模型订单号
    // 价格参数
    let price_sub = 0 // 减去价格
    let price_order = 0 // 订单价格
    let price_pay = 0 // 支付价格

    console.log(`111---cart_id_list_select:`, body.cart_id_list_select)
    const cart_items = await this.db.tb_model_cart.findMany({
      where: { id: { in: body.cart_id_list_select } },
      include: { product: true },
    })
    console.log('cart_items:', cart_items)

    // 计算价格
    for (const cart of cart_items) {
      let price_type = cart.price_type
      const item_price = cart.product[price_type] * cart.count
      price_order += item_price //累加 购物车中商品的价格[价格类型] 乘以 购物车中商品的数量
      console.log(`111---222:`, cart)
      console.log(`111---product_id:`, cart.product.id)
      console.log(`111---order_number:`, order_number)
    }

    // 支付价格
    price_pay = price_order - price_sub //减去优惠的价格,得到实际支付的价格

    // 创建订单
    const order = await this.db.tb_model_order_list.create({
      data: {
        order_number,
        user_id: body.user_id,
        price_sub,
        price_order,
        price_pay,
        pay_time: new Date(),
        status: 'model_pendingPayment',
      },
    })

    // 创建 tb_model_order_history 存储数据
    const history_order_promises = cart_items.map(async (cart) => {
      return await this.db.tb_model_order_history.create({
        data: {
          is_deleted: false,
          cart_history: cart, // 购物车历史,记录购物车历史(包含商品,数量,价格类型)
          product_id: cart.product.id, // 商品id
          order_number, // 订单号
        },
      })
    })

    // 等待所有订单历史记录创建完成
    const history_orders = await Promise.all(history_order_promises)
    console.log('创建的订单历史记录:', history_orders)

    return {
      code: 200,
      msg: '成功:新增-模型订单',
      result: {
        order_number,

        history_orders_count: history_orders.length,
        total_price: price_pay,
      },
    }
  }

  @ApiPost('find_list_model_order', '查询-模型订单-列表')
  async find_list_model_order(@Body() body: find_list_model_order, @Req() req: any) {
    console.log('find_list_model_order---body:', body)
    const list = await this.db.tb_model_order_list.findMany({
      // where: { user_id: body.user_id, order_number: { contains: body.order_number }, status: { contains: body.status } },
      where: { user_id: body.user_id, order_number: { contains: body.order_number }, is_deleted: false },
      include: { tb_model_order_history: true },
      skip: (body.page_index - 1) * body.page_size,
      take: body.page_size,
      orderBy: { [body.order_by]: body.order_type } as any,
    })
    return { code: 200, msg: '成功:查询-模型订单-列表', result: { list } }
  }

  // 删除
  @ApiGet('delete_model_order', '删除-模型订单')
  @ApiQuery({ name: 'order_number', description: '删除-order_number', required: true, type: String, example: 'cuid_string' })
  async delete_model_order(@Query('order_number') order_number: string, @Req() req: any) {
    console.log('delete_model_card---id:', order_number, typeof order_number)
    const data = await this.db.tb_model_order_list.update({ where: { order_number }, data: { is_deleted: true } })
    return { code: 200, msg: '成功:删除-模型订单-id', result: data }
  }
}

@Module({
  controllers: [model_order],
  providers: [],
})
export class model_order_Module {}
