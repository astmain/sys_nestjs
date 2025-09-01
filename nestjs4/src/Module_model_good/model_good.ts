// 通用包
import { AppController, ApiGet, ApiPost, ApiQuery, Controller, Module, Query, Body, ApiTags, ParseIntPipe } from '@src/Plugins/AppController'

// 自定义包
import { Dec_public } from '@src/AppAuthorized'

// 自定义dto
import * as dto from './dto'

@ApiTags('模型商品')
@Dec_public()
@Controller()
export class model_good extends AppController {
  @ApiPost('create_model_good', '创建模型商品')
  async create_model_good(@Body() body: dto.create_model_good) {
    console.log('create_model_good---body:', body)
    const data = await this.db.tb_model_good.create({
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
    return { code: 200, msg: '成功:创建模型商品', result: data }
  }

  @ApiPost('update_model_good', '更新模型商品')
  async update_model_good(@Body() body: dto.update_model_good) {
    console.log('update_model_good---body:', body)
    const data = await this.db.tb_model_good.update({
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
    return { code: 200, msg: '成功:更新模型商品', result: data }
  }

  @ApiGet('delete_model_good', '删除模型商品(逻辑删除)')
  @ApiQuery({ name: 'id', description: '删除id', required: true, type: Number, example: 1 })
  async delete_model_good(@Query('id', ParseIntPipe) id: number) {
    console.log('delete_model_good---id:', id, typeof id)
    const data = await this.db.tb_model_good.update({ where: { id: id }, data: { is_deleted: true } })
    return { code: 200, msg: '成功:逻辑删除模型商品', result: data }
  }

  @ApiGet('restore_model_good', '恢复模型商品')
  @ApiQuery({ name: 'id', description: '恢复id', required: true, type: Number, example: 1 })
  async restore_model_good(@Query('id', ParseIntPipe) id: number) {
    console.log('restore_model_good---id:', id, typeof id)
    const data = await this.db.tb_model_good.update({ where: { id: id }, data: { is_deleted: false } })
    return { code: 200, msg: '成功:恢复模型商品', result: data }
  }

  @ApiGet('get_model_good_by_id', '根据ID获取模型商品')
  @ApiQuery({ name: 'id', description: '模型商品id', required: true, type: Number, example: 1 })
  async get_model_good_by_id(@Query('id', ParseIntPipe) id: number) {
    console.log('get_model_good_by_id---id:', id, typeof id)
    const data = await this.db.tb_model_good.findFirst({
      where: { id: id, is_deleted: false, is_published: true },
    })
    return { code: 200, msg: '成功:获取模型商品', result: data }
  }

  @ApiPost('update_publish_status', '更新模型商品发布状态')
  async update_publish_status(@Body() body: dto.update_publish_status) {
    console.log('update_publish_status---body:', body)
    const data = await this.db.tb_model_good.update({
      where: { id: body.id },
      data: {
        is_published: body.is_published,
      },
    })
    return { code: 200, msg: '成功:更新发布状态', result: data }
  }

  @ApiPost('find_model_good', '查询模型商品(分页排序)')
  async find_model_good(@Body() body: dto.find_model_good) {
    console.log('find_model_good---body:', body)

    // 设置默认分页参数
    const page_index = body.page_index || 1
    const page_size = body.page_size || 10
    const skip = (page_index - 1) * page_size

    // 构建查询条件
    const where_condition: any = {}

    // 根据include_deleted参数决定是否包含已删除记录
    if (!body.include_deleted) {
      where_condition.is_deleted = false
    }

    // 根据only_published参数决定是否只查询已发布的记录
    if (body.only_published !== false) {
      where_condition.is_published = true
    }

    if (body.title) where_condition.title = { contains: body.title }
    if (body.author_name) where_condition.author_name = { contains: body.author_name }

    // 设置排序参数 - 默认按收藏数从大到小排序
    const order_by = body.order_by || 'count_collect'
    const order_type = body.order_type || 'desc'
    const orderBy = { [order_by]: order_type }

    // 查询数据和总数（按指定字段排序）
    const [list, count_total] = await Promise.all([
      this.db.tb_model_good.findMany({
        where: where_condition,
        skip: skip,
        take: page_size,
        orderBy: orderBy,
      }),
      this.db.tb_model_good.count({ where: where_condition }),
    ])

    const result = {
      list,
      pagination: {
        page_index,
        page_size,
        count_total,
        page_total: Math.ceil(count_total / page_size),
      },
    }
    console.log('find_model_good---result:', result)
    return { code: 200, msg: '成功:查询模型商品', result: result }
  }
}

@Module({
  controllers: [model_good],
  providers: [],
})
export class Module_model_good {}
