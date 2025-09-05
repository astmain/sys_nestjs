// 基础包
import { AppController, ApiGet, ApiPost, ApiQuery, Controller, Module, Query, Body, ApiTags, Req, ParseIntPipe } from '@src/Plugins/AppController'

// dto
import { save_model_product } from './dto/save_model_product'
import { admin_save_model_product } from './dto/admin_save_model_product'
import { find_list_model_product } from './dto/find_list_model_product'
import { find_info_model_product } from './dto/find_info_model_product'

@ApiTags('模型商品')
@Controller('model_api')
export class model_product extends AppController {
  // ================================ 用户接口 ================================
  @ApiPost('save_model_product', '更新-模型商品')
  async save_model_product(@Body() body: save_model_product, @Req() req: any) {
    // console.log('save_update_model_product---body:', body)
    const { id, kind_ids, ...createData } = body
    // 如果有id且不为空，则更新；否则创建新记录
    if (id && id.trim() !== '') {
      // 更新现有记录
      const data = await this.db.tb_model_product.update({
        where: { id },
        //                                            // 更新分类关联
        data: { ...createData, user_id: req.user_id, tb_model_kind: kind_ids ? { set: kind_ids.map((kindId) => ({ id: kindId })) } : undefined },
        include: { tb_model_kind: true },
      })
      return { code: 200, msg: '成功:更新-模型商品', result: data }
    } else {
      // 创建新记录
      const data = await this.db.tb_model_product.create({
        //                                        todo 先开始默认审核通过      // 创建分类关联
        data: { ...createData, user_id: req.user_id, is_check: true, tb_model_kind: kind_ids ? { connect: kind_ids.map((kindId) => ({ id: kindId })) } : undefined },
        include: { tb_model_kind: true },
      })
      return { code: 200, msg: '成功:新增-模型商品', result: data }
    }
  }

  @ApiPost('find_list_model_product', '查询-模型商品-列表')
  async find_list_model_product(@Body() body: find_list_model_product) {
    // console.log('find_list_model_product---body:', body)
    // 模糊字段搜索条件
    const where: any = { title: { contains: body.title || '' } }
    if (body.is_public !== undefined && body.is_public !== null) where.is_public = body.is_public
    if (body.is_deleted !== undefined && body.is_deleted !== null) where.is_deleted = body.is_deleted
    if (body.is_check !== undefined && body.is_check !== null) where.is_check = body.is_check
    if (body.is_business !== undefined && body.is_business !== null) where.is_business = body.is_business
    if (body.is_skeleton !== undefined && body.is_skeleton !== null) where.is_skeleton = body.is_skeleton
    if (body.is_animation !== undefined && body.is_animation !== null) where.is_animation = body.is_animation
    if (body.is_print !== undefined && body.is_print !== null) where.is_print = body.is_print
    if (body.is_no_collapse !== undefined && body.is_no_collapse !== null) where.is_no_collapse = body.is_no_collapse
    if (body.area_unit) where.area_unit = body.area_unit
    if (body.wiring) where.wiring = body.wiring
    if (body.kind_ids && body.kind_ids.length > 0) where.tb_model_kind = { some: { id: { in: body.kind_ids } } } // 添加分类筛选条件
    // console.log('find_list_model_product---where:', where)

    const list = await this.db.tb_model_product.findMany({
      where,
      skip: (body.page_index - 1) * body.page_size,
      take: body.page_size,
      orderBy: { [body.order_by]: body.order_type } as any,
      include: { tb_model_kind: true },
    })
    const count = await this.db.tb_model_product.count({ where })
    const page_total = Math.ceil(count / body.page_size)
    const pagination = { page_index: body.page_index, page_size: body.page_size, count_total: count, page_total: page_total }
    const result = { list, pagination }
    console.log('find_list_model_product---data:', result)
    return { code: 200, msg: '成功:查询-模型商品-列表', result: result }
  }

  @ApiPost('find_info_model_product', '查询-模型商品-详情')
  async find_info_model_product(@Body() body: find_info_model_product) {
    console.log('find_info_model_product---body:', body)
    const data = await this.db.tb_model_product.findFirst({ where: { id: body.id, is_deleted: false }, include: { tb_model_kind: true } })
    console.log('find_info_model_product---data:', data)
    return { code: 200, msg: '成功:查询-模型商品-详情', result: data }
  }

  @ApiGet('delete_model_product', '删除-模型商品-id')
  @ApiQuery({ name: 'id', description: '删除-id', required: true, type: String, example: 'cuid_string' })
  async delete_model_product(@Query('id') id: string) {
    console.log('delete_model_product---id:', id, typeof id)
    const data = await this.db.tb_model_product.update({ where: { id }, data: { is_deleted: true } })
    return { code: 200, msg: '成功:删除-模型商品-id', result: data }
  }

  @ApiGet('get_kind_tree', '获取分类树')
  async get_kind_tree() {
    // 获取所有分类数据
    const all_kinds = await this.db.tb_model_kind.findMany({ where: { is_deleted: false }, orderBy: { id: 'asc' } })
    // 构建树状结构
    const build_tree = (items: any[], parent_id: number | null = null): any[] => {
      return items.filter((item) => item.parent_id === parent_id).map((item) => ({ ...item, children: build_tree(items, item.id) }))
    }

    const tree_data = build_tree(all_kinds)
    console.log('get_kind_tree---tree_data:', JSON.stringify(tree_data, null, 2))
    return { code: 200, msg: '成功:获取分类树', result: tree_data }
  }

  // ================================ 管理员接口 ================================
  @ApiPost('admin_save_model_product', '保存-(admin)-模型商品')
  async admin_save_model_product(@Body() body: admin_save_model_product, @Req() req: any) {
    console.log('save_admin_model_product---body:', body)
    console.log('save_admin_model_product---user_id:', req.user_id)
    const { id, kind_ids, ...createData } = body

    // 如果有id且不为空，则更新；否则创建新记录
    if (id && id.trim() !== '') {
      // 更新现有记录
      const data = await this.db.tb_model_product.update({
        where: { id },
        //                                            更新分类关联
        data: { ...createData, user_id: req.user_id, tb_model_kind: kind_ids ? { set: kind_ids.map((kindId) => ({ id: kindId })) } : undefined },
        include: { tb_model_kind: true },
      })
      return { code: 200, msg: '成功:更新(admin)模型商品', result: data }
    } else {
      // 创建新记录
      const data = await this.db.tb_model_product.create({
        //                                            创建分类关联
        data: { ...createData, user_id: req.user_id, tb_model_kind: kind_ids ? { connect: kind_ids.map((kindId) => ({ id: kindId })) } : undefined },
        include: { tb_model_kind: true },
      })
      return { code: 200, msg: '成功:新增(admin)模型商品', result: data }
    }
  }
}

@Module({
  controllers: [model_product],
  providers: [],
})
export class model_product_Module {}
