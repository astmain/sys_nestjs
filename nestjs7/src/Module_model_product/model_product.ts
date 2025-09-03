// 基础包
// 通常要使用的包(已经封装置AppController中,可以直接使用,减少import的容易引入)
import { AppController, ApiGet, ApiPost, ApiQuery, Controller, Module, Query, Body, ApiTags, Req, ParseIntPipe } from '@src/Plugins/AppController'

// 开放接口
// 装饰器,开放接口,不需要验证
import { Dec_public } from '@src/AppAuthorized'

// 自定义dto
// dto  * as dto 统一到处方便使用
import * as dto from './dto'

@ApiTags('模型商品')
@Controller() //控制器层,定义接口,直接写业务代码,省略service层,更方便开发
export class model_product extends AppController {
  @ApiPost('save_model_product', '保存-模型商品')
  async save_model_product(@Body() body: dto.save_model_product, @Req() req: any) {
    console.log('save_model_product---body:', body)
    console.log('save_model_product---user_id:', req.user_id)
    const { id, ...createData } = body
    // 如果有id且不为空，则更新；否则创建新记录
    if (id && id.trim() !== '') {
      // 更新现有记录
      const data = await this.db.tb_model_product.update({
        where: { id },
        data: { ...createData, user_id: req.user_id },
      })
      return { code: 200, msg: '成功:更新-模型商品', result: data }
    } else {
      // 创建新记录
      const data = await this.db.tb_model_product.create({
        data: { ...createData, user_id: req.user_id },
      })
      return { code: 200, msg: '成功:创建-模型商品', result: data }
    }
  }

  @ApiPost('find_list_model_product', '查询-模型商品-列表')
  async find_list_model_product(@Body() body: dto.find_list_model_product) {
    console.log('find_list_model_product---body:', body)

    // 模糊字段搜索条件
    const where: any = {
      title: { contains: body.title || '' },
    }
    // 
    if (body.is_public !== undefined && body.is_public !== null) {
      where.is_public = body.is_public
    }
    if (body.is_deleted !== undefined && body.is_deleted !== null) {
      where.is_deleted = body.is_deleted
    }
    if (body.is_check !== undefined && body.is_check !== null) {
      where.is_check = body.is_check
    }
    if (body.is_business !== undefined && body.is_business !== null) {
      where.is_business = body.is_business
    }
    if (body.is_skeleton !== undefined && body.is_skeleton !== null) {
      where.is_skeleton = body.is_skeleton
    }
    if (body.is_animation !== undefined && body.is_animation !== null) {
      where.is_animation = body.is_animation
    }
    if (body.is_print !== undefined && body.is_print !== null) {
      where.is_print = body.is_print
    }
    if (body.is_no_collapse !== undefined && body.is_no_collapse !== null) {
      where.is_no_collapse = body.is_no_collapse
    }

    if (body.area_unit) {
      where.area_unit = body.area_unit
    }
    if (body.wiring) {
      where.wiring = body.wiring
    }

    const list = await this.db.tb_model_product.findMany({
      where,
      skip: (body.page_index - 1) * body.page_size,
      take: body.page_size,
      orderBy: { [body.order_by]: body.order_type } as any,
    })
    const count = await this.db.tb_model_product.count({ where })
    const page_total = Math.ceil(count / body.page_size)
    const pagination = { page_index: body.page_index, page_size: body.page_size, count_total: count, page_total: page_total }
    const result = { list, pagination }
    console.log('find_list_model_product---data:', result)
    return { code: 200, msg: '成功:查询-模型商品-列表', result: result }
  }

  @ApiPost('find_info_model_product', '查询-模型商品-详情')
  async find_info_model_product(@Body() body: dto.find_info_model_product) {
    console.log('find_info_model_product---body:', body)
    const data = await this.db.tb_model_product.findFirst({
      where: { id: body.id, is_deleted: false },
    })
    console.log('find_info_model_product---data:', data)
    return { code: 200, msg: '成功:查询-模型商品-详情', result: data }
  }

  @ApiGet('delete_model_product', '删除-模型商品-id')
  @ApiQuery({ name: 'id', description: '删除-id', required: true, type: String, example: 'cuid_string' })
  async delete_model_product(@Query('id') id: string) {
    console.log('delete_model_product---id:', id, typeof id)
    const data = await this.db.tb_model_product.update({
      where: { id },
      data: { is_deleted: true },
    })
    return { code: 200, msg: '成功:删除-模型商品-id', result: data }
  }
}

@Module({
  controllers: [model_product],
  providers: [],
})
export class Module_model_product {}
