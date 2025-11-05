// 通用包
import { AppController, ApiGet, ApiPost, ApiQuery, Controller, Module, Query, Body, ApiTags, ParseIntPipe } from '@src/Plugins/AppController'

// 自定义包
import { Dec_public } from '@src/AppAuthorized'

// 自定义dto
import * as dto from './dto'

@ApiTags('模型订单')
@Dec_public()
@Controller()
export class model_order extends AppController {
  @ApiPost('create_model_order', '创建订单')
  async create_model_order(@Body() body: dto.create_model_order) {
    console.log('create_model_order---body:', body)
    const data = await this.db.tb_model_order.create({ data: { model_order_id: body.model_order_id, status: body.status } })
    return { code: 200, msg: '成功:创建订单', result: data }
  }

  @ApiPost('update_model_order', '更新订单')
  async update_model_order(@Body() body: dto.update_model_order) {
    console.log('update_model_order---body:', body)
    const data = await this.db.tb_model_order.update({ where: { id: body.id }, data: { model_order_id: body.model_order_id, status: body.status } })
    return { code: 200, msg: '成功:更新订单', result: data }
  }

  @ApiPost('find_model_order', '查询订单')
  async find_model_order(@Body() body: dto.find_model_order) {
    console.log('find_model_order---body:', body)
    const data = await this.db.tb_model_order.findMany({
      where: { model_order_id: body.model_order_id || undefined, status: body.status || undefined },
    })
    console.log('find_model_order---data:', data)
    return { code: 200, msg: '成功:查询订单', result: data }
  }

  @ApiPost('find_model_order_page', '分页查询订单')
  async find_model_order_page(@Body() body: dto.find_model_order_page) {
    console.log('find_model_order_page---body:', body)

    // 设置默认分页参数
    const page_index = body.page_index || 1
    const page_size = body.page_size || 10
    const skip = (page_index - 1) * page_size

    // 构建查询条件
    const where_condition: any = {}
    if (body.model_order_id) {
      where_condition.model_order_id = { contains: body.model_order_id }
    }
    if (body.status) {
      where_condition.status = body.status
    }

    // 查询数据和总数
    const [data, total] = await Promise.all([
      this.db.tb_model_order.findMany({
        where: where_condition,
        skip: skip,
        take: page_size,
        orderBy: { created_at: 'desc' },
      }),
      this.db.tb_model_order.count({
        where: where_condition,
      }),
    ])

    const result = {
      list: data,
      pagination: {
        page_index: page_index,
        page_size: page_size,
        count_total: total,
        page_total: Math.ceil(total / page_size),
      },
    }

    console.log('find_model_order_page---result:', result)
    return { code: 200, msg: '成功:分页查询订单', result: result }
  }

  @ApiGet('delete_model_order', '删除订单')
  @ApiQuery({ name: 'id', description: '删除id', required: true, type: Number, example: 1 })
  async delete_model_order(@Query('id', ParseIntPipe) id: number) {
    console.log('delete_model_order---id:', id, typeof id)
    const data = await this.db.tb_model_order.deleteMany({ where: { id: id } })
    return { code: 200, msg: '成功:删除订单', result: data }
  }

  @ApiGet('get_model_order_by_id', '根据ID获取订单')
  @ApiQuery({ name: 'id', description: '订单id', required: true, type: Number, example: 1 })
  async get_model_order_by_id(@Query('id', ParseIntPipe) id: number) {
    console.log('get_model_order_by_id---id:', id, typeof id)
    const data = await this.db.tb_model_order.findUnique({ where: { id: id } })
    return { code: 200, msg: '成功:获取订单', result: data }
  }
}

@Module({
  controllers: [model_order],
  providers: [],
})
export class Module_model_order {}
