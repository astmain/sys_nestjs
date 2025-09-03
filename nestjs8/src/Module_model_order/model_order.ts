// 基础包
// 通常要使用的包(已经封装置AppController中,可以直接使用,减少import的容易引入)
import { AppController, ApiGet, ApiPost, ApiQuery, Controller, Module, Query, Body, ApiTags, ParseIntPipe, Req } from '@src/Plugins/AppController'

// 开放接口
// 装饰器,开放接口,不需要验证
import { Dec_public } from '@src/AppAuthorized'

// 自定义dto
// dto  * as dto 统一到处方便使用
import * as dto from './dto'

@ApiTags('模型订单')
@Controller() //控制器层,定义接口,直接写业务代码,省略service层,更方便开发
export class model_order extends AppController {
  @ApiPost('create_model_order', '新增-模型订单')
  async create_model_order(@Body() body: dto.create_model_order, @Req() req: any) {
    console.log('create_model_order---body:', body)

    // 生成订单号
    const order_number = `ORD${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}${String(Date.now()).slice(-6)}`

    // 计算订单总价
    const price_order = body.order_items.reduce((total, item) => total + item.price_one * item.count, 0)
    const price_pay = price_order - (body.price_sub || 0)

    // 验证商品是否存在
    for (const item of body.order_items) {
      const product = await this.db.tb_model_product.findUnique({
        where: { id: item.product_id },
      })
      if (!product) {
        return { code: 400, msg: `失败:商品不存在 - ${item.product_id}`, result: null }
      }
    }

    // 创建订单
    const order = await this.db.tb_order_list.create({
      data: {
        order_number,
        user_id: req.user_id,
        price_sub: body.price_sub || 0,
        price_order,
        price_pay,
        status: dto.enum_order_status.PAYING,
      },
    })

    // 创建订单详情
    const order_infos = await Promise.all(
      body.order_items.map((item) =>
        this.db.tb_order_info.create({
          data: {
            order_number,
            product_id: item.product_id,
            price_one: item.price_one,
            count: item.count,
          },
        }),
      ),
    )

    const result = {
      order,
      order_infos,
    }

    return { code: 200, msg: '成功:新增-模型订单', result: result }
  }

  @ApiPost('update_model_order_status', '更新-订单状态')
  async update_model_order_status(@Body() body: dto.update_model_order_status, @Req() req: any) {
    console.log('update_model_order_status---body:', body)
    const data = await this.db.tb_order_list.update({
      where: { order_number: body.order_number },
      data: {
        // status: body.status as dto.enum_order_status,
        status: body.status as any,
        pay_time: body.status === dto.enum_order_status.PAYED ? new Date() : undefined,
      },
    })
    return { code: 200, msg: '成功:更新-订单状态', result: data }
  }

  @ApiPost('find_list_model_order', '查询-模型订单-列表')
  async find_list_model_order(@Body() body: dto.find_list_model_order, @Req() req: any) {
    console.log('find_list_model_order---body:', body)

    const where: any = { is_deleted: false } // 只查询未被逻辑删除的数据
    if (body.user_id) where.user_id = req.user_id
    if (body.order_number) where.order_number = { contains: body.order_number }
    if (body.status) where.status = String(body.status)

    const list = await this.db.tb_order_list.findMany({
      where,
      include: {
        tb_order_info: {
          include: {
            tb_model_product: true,
          },
        },
      },
      skip: (body.page_index - 1) * body.page_size,
      take: body.page_size,
      orderBy: { [body.order_by]: body.order_type } as any,
    })
    const count = await this.db.tb_order_list.count({ where })
    const page_total = Math.ceil(count / body.page_size)
    const pagination = { page_index: body.page_index, page_size: body.page_size, count_total: count, page_total: page_total }
    const result = { list, pagination }
    console.log('find_list_model_order---data:', result)
    return { code: 200, msg: '成功:查询-模型订单-列表', result: result }
  }

  @ApiPost('find_info_model_order', '查询-模型订单-详情')
  async find_info_model_order(@Body() body: dto.find_info_model_order, @Req() req: any) {
    console.log('find_info_model_order---body:', body)
    const data = await this.db.tb_order_list.findFirst({
      where: { order_number: body.order_number, is_deleted: false },
      include: {
        tb_order_info: {
          include: {
            tb_model_product: true,
          },
        },
      },
    })
    console.log('find_info_model_order---data:', data)
    return { code: 200, msg: '成功:查询-模型订单-详情', result: data }
  }

  @ApiGet('delete_model_order', '删除-模型订单')
  @ApiQuery({ name: 'order_number', description: '订单号', required: true, type: String, example: 'ORD20231201001' })
  async delete_model_order(@Query('order_number') order_number: string, @Req() req: any) {
    console.log('delete_model_order---order_number:', order_number, typeof order_number)

    // 使用事务进行逻辑删除
    const result = await this.db.$transaction(async (tx) => {
      // 先逻辑删除订单详情
      await tx.tb_order_info.updateMany({
        where: { order_number },
        data: { is_deleted: true },
      })

      // 再逻辑删除订单
      const data = await tx.tb_order_list.update({
        where: { order_number },
        data: { is_deleted: true },
      })

      return data
    })

    return { code: 200, msg: '成功:删除-模型订单', result }
  }

  @ApiPost('create_order_from_cart', '从购物车创建订单')
  async create_order_from_cart(@Body() body: { user_id: number; price_sub?: number }, @Req() req: any) {
    console.log('create_order_from_cart---body:', body)

    // 获取用户购物车
    const cart_items = await this.db.tb_model_cart.findMany({
      where: { user_id: req.user_id },
      include: { product: true },
    })

    if (cart_items.length === 0) {
      return { code: 400, msg: '失败:购物车为空', result: null }
    }

    // 生成订单号
    const order_number = `ORD${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}${String(Date.now()).slice(-6)}`

    // 计算订单总价
    const price_order = cart_items.reduce((total, item) => total + item.price, 0)
    const price_pay = price_order - (body.price_sub || 0)

    // 创建订单
    const order = await this.db.tb_order_list.create({
      data: {
        order_number,
        user_id: req.user_id,
        price_sub: body.price_sub || 0,
        price_order,
        price_pay,
        status: dto.enum_order_status.PAYING,
      },
    })

    // 创建订单详情
    const order_infos = await Promise.all(
      cart_items.map((item) =>
        this.db.tb_order_info.create({
          data: {
            order_number,
            product_id: item.product_id,
            price_one: item.price,
            count: 1,
          },
        }),
      ),
    )

    // 清空购物车
    await this.db.tb_model_cart.deleteMany({ where: { user_id: req.user_id } })

    const result = {
      order,
      order_infos,
    }

    return { code: 200, msg: '成功:从购物车创建订单', result: result }
  }
}

// 模块层直接写在当前文件中,导入控制器层,方便其他模块导入使用
@Module({
  controllers: [model_order],
  providers: [],
})
export class Module_model_order {}
