// 基础包
// 通常要使用的包(已经封装置AppController中,可以直接使用,减少import的容易引入)
import { AppController, ApiGet, ApiPost, ApiQuery, Controller, Module, Query, Body, ApiTags, ParseIntPipe } from '@src/Plugins/AppController'

// 开放接口
// 装饰器,开放接口,不需要验证
import { Dec_public } from '@src/AppAuthorized'

// 自定义dto
// dto  * as dto 统一到处方便使用
import * as dto from './dto'

@ApiTags('模型购车')
@Dec_public()
@Controller() //控制器层,定义接口,直接写业务代码,省略service层,更方便开发
export class model_card extends AppController {
  @ApiPost('create_model_card', '新增-模型购车数据')
  async create_model_card(@Body() body: dto.create_model_card) {
    console.log('create_model_card---body:', body)
    const data = await this.db.tb_model_card.create({
      data: { 
        user_id: body.user_id, 
        model_id: body.model_id, 
        model_title: body.model_title, 
        model_price: body.model_price, 
        model_format: body.model_format 
      },
    })
    return { code: 200, msg: '成功:新增-模型购车数据', result: data }
  }

  @ApiPost('update_model_card', '更新-模型购车数据')
  async update_model_card(@Body() body: dto.update_model_card) {
    console.log('update_model_card---body:', body)
    const data = await this.db.tb_model_card.update({
      where: { id: body.id },
      data: { 
        user_id: body.user_id, 
        model_id: body.model_id, 
        model_title: body.model_title, 
        model_price: body.model_price, 
        model_format: body.model_format 
      },
    })
    return { code: 200, msg: '成功:更新-模型购车数据', result: data }
  }

  @ApiPost('find_list_model_card', '查询-模型购车数据-列表')
  async find_list_model_card(@Body() body: dto.find_list_model_card) {
    console.log('find_list_model_card---body:', body)
    const list = await this.db.tb_model_card.findMany({
      where: { 
        user_id: body.user_id,
        is_deleted: false 
      },
      skip: (body.page_index - 1) * body.page_size,
      take: body.page_size,
      orderBy: { [body.order_by]: body.order_type } as any,
    })
    const count = await this.db.tb_model_card.count({ 
      where: { 
        user_id: body.user_id,
        is_deleted: false 
      } 
    })
    const page_total = Math.ceil(count / body.page_size)
    const pagination = { page_index: body.page_index, page_size: body.page_size, count_total: count, page_total: page_total }
    const result = { list, pagination }
    console.log('find_list_model_card---data:', result)
    return { code: 200, msg: '成功:查询-模型购车数据-列表', result: result }
  }

  @ApiPost('find_info_model_card', '查询-模型购车数据-详情')
  async find_info_model_card(@Body() body: dto.find_info_model_card) {
    console.log('find_info_model_card---body:', body)
    const data = await this.db.tb_model_card.findUnique({ where: { id: body.id } })
    console.log('find_info_model_card---data:', data)
    return { code: 200, msg: '成功:查询-模型购车数据-详情', result: data }
  }

  @ApiGet('delete_model_card', '删除-模型购车数据-id')
  @ApiQuery({ name: 'id', description: '删除-id', required: true, type: Number, example: 1 })
  async delete_model_card(@Query('id', ParseIntPipe) id: number) {
    console.log('delete_model_card---id:', id, typeof id)
    const data = await this.db.tb_model_card.delete({ where: { id: id } })
    return { code: 200, msg: '成功:删除-模型购车数据-id', result: data }
  }

  @ApiPost('init_model_card', '初始-模型购车数据')
  @ApiQuery({ name: 'password', description: '初始化数据密码', required: true, type: Number })
  async init_model_card(@Query('password', ParseIntPipe) password: number) {
    if (password !== 123456) return { code: 400, msg: '失败:初始化数据密码', result: null }
    const data = await this.db.tb_model_card.deleteMany()
    await this.db.tb_model_card.create({ data: { id: 1, user_id: 'user1', model_id: 'model1', model_title: '3D汽车模型1', model_price: 100, model_format: '.stl' } })
    await this.db.tb_model_card.create({ data: { id: 2, user_id: 'user1', model_id: 'model2', model_title: '3D建筑模型1', model_price: 200, model_format: '.obj' } })
    await this.db.tb_model_card.create({ data: { id: 3, user_id: 'user2', model_id: 'model3', model_title: '3D人物模型1', model_price: 150, model_format: '.fbx' } })
    await this.db.tb_model_card.create({ data: { id: 4, user_id: 'user2', model_id: 'model4', model_title: '3D动物模型1', model_price: 80, model_format: '.stl' } })
    await this.db.tb_model_card.create({ data: { id: 5, user_id: 'user3', model_id: 'model5', model_title: '3D家具模型1', model_price: 120, model_format: '.obj' } })
    const list = await this.db.tb_model_card.findMany({
      select: {
        id: true,
        user_id: true,
        model_id: true,
        model_title: true,
        model_price: true,
        model_format: true,
        is_deleted: true,
        created_at: true,
        updated_at: true,
      },
    })
    return { code: 200, msg: '成功:初始-模型购车数据', result: { list } }
  }
}

// 模块层直接写在当前文件中,导入控制器层,方便其他模块导入使用
@Module({
  controllers: [model_card],
  providers: [],
})
export class Module_model_card {}
