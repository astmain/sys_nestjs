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
export class model_good extends AppController {
  @ApiPost('create_model_good', '新增-模型商品')
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
        price_personal: body.price_personal,
        price_company: body.price_company,
        price_extend: body.price_extend,
        is_free: body.is_free,
        is_business: body.is_business,
        is_skeleton: body.is_skeleton,
        is_animation: body.is_animation,
        model_format: body.model_format,
        model_texture: body.model_texture as any,
        area_unit: body.area_unit,
        wiring: body.wiring,
      },
    })
    return { code: 200, msg: '成功:新增-模型商品', result: data }
  }

  @ApiPost('update_model_good', '更新-模型商品')
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

        price_personal: body.price_personal,
        price_company: body.price_company,
        price_extend: body.price_extend,

        is_free: body.is_free,
        is_business: body.is_business,
        is_skeleton: body.is_skeleton,
        is_animation: body.is_animation,
        model_format: body.model_format,
        model_texture: body.model_texture as any,
        area_unit: body.area_unit,
        wiring: body.wiring,
      },
    })
    return { code: 200, msg: '成功:更新-模型商品', result: data }
  }

  @ApiGet('delete_model_good', '删除-模型商品')
  @ApiQuery({ name: 'id', description: '删除id', required: true, type: Number, example: 1 })
  async delete_model_good(@Query('id', ParseIntPipe) id: number) {
    console.log('delete_model_good---id:', id, typeof id)
    const data = await this.db.tb_model_good.update({ where: { id: id }, data: { is_deleted: true } })
    return { code: 200, msg: '成功:删除-模型商品', result: data }
  }

  @ApiPost('find_list_model_good', '查询-模型商品-列表')
  async find_list_model_good(@Body() body: dto.find_list_model_good) {
    console.log('find_list_model_good---body:', body)

    // 设置默认分页参数
    const page_index = body.page_index || 1
    const page_size = body.page_size || 10
    const skip = (page_index - 1) * page_size

    // 构建查询条件
    const where_condition: any = {}

    // 根据include_deleted参数决定是否包含已删除记录
    if (!body.is_deleted) {
      where_condition.is_deleted = false
    }

    // 根据only_published参数决定是否只查询已发布的记录
    if (body.is_published !== false) {
      where_condition.is_published = true
    }

    // 根据only_check参数决定是否只查询已审核通过的记录
    if (body.is_check !== false) {
      where_condition.is_check = true
    }

    if (body.title) where_condition.title = { contains: body.title }
    if (body.author_name) where_condition.author_name = { contains: body.author_name }

    // 设置排序参数 - 默认按收藏数从大到小排序
    const order_by = body.order_by || 'count_collect'
    const order_type = body.order_type || 'desc'
    const orderBy = { [order_by]: order_type }

    // 查询数据和总数（按指定字段排序）
    const [list, count_total] = await Promise.all([
      this.db.tb_model_good.findMany({ where: where_condition, skip: skip, take: page_size, orderBy: orderBy }),
      this.db.tb_model_good.count({ where: where_condition }),
    ])

    const result = {
      list,
      pagination: { page_index, page_size, count_total, page_total: Math.ceil(count_total / page_size) },
    }
    console.log('find_list_model_good---result:', result)
    return { code: 200, msg: '成功:查询模型商品', result: result }
  }

  @ApiGet('find_info_model_good', '查询-模型商品-详情')
  @ApiQuery({ name: 'id', description: '模型商品id', required: true, type: Number, example: 1 })
  async find_info_model_good(@Query('id', ParseIntPipe) id: number) {
    console.log('find_info_model_good---id:', id, typeof id)
    const data = await this.db.tb_model_good.findFirst({
      where: { id: id, is_deleted: false, is_published: true },
    })
    return { code: 200, msg: '成功:获取模型商品', result: data }
  }

  @ApiPost('save_admin_model_good', '(管理员)保存-模型商品')
  async save_admin_model_good(@Body() body: dto.save_admin_model_good) {
    console.log('save_admin_model_good---body:', body)
    const { id, ...createData } = body
    const one = await this.db.tb_model_good.upsert({
      where: { id: body.id },
      update: body,
      create: {
        model_id: createData.model_id || '',
        ...createData,
      },
    })

    let flag = id ? '更新' : '新增'
    return { code: 200, msg: '成功:保存-模型商品-' + flag, result: one }
  }
}

// 模块层直接写在当前文件中,导入控制器层,方便其他模块导入使用
@Module({
  controllers: [model_good],
  providers: [],
})
export class Module_model_good {}
