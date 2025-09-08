import { ApiGet, ApiPost, ApiQuery, ApiTags, AppController, Body, Controller, Module, ParseIntPipe, Query } from '@src/Plugins/AppController'

import { create_model_kind } from './dto/create_model_kind'
import { update_model_kind } from './dto/update_model_kind'

@ApiTags('模型分类')
@Controller("model_api") 
export class model_kind extends AppController {
  @ApiPost('create_model_kind', '新增-模型分类')
  async create_model_kind(@Body() body: create_model_kind) {
    // 判断是否存在
    const is_exist = await this.db.tb_model_kind.findFirst({ where: { name: body.name, parent_id: body.parent_id, is_deleted: false } })
    if (is_exist) return { code: 400, msg: '失败:数据已存在', result: null }
    const data = await this.db.tb_model_kind.create({ data: { name: body.name, parent_id: body.parent_id } })
    return { code: 200, msg: '成功:新增-模型分类', result: data }
  }

  @ApiGet('delete_model_kind', '删除-模型分类')
  @ApiQuery({ name: 'id', description: '删除id', required: true, type: Number, example: 1 })
  async delete_model_kind(@Query('id', ParseIntPipe) id: number) {
    console.log('delete_model_kind---id:', id, typeof id)
    // 判断是否存在且未被删除
    const is_exist = await this.db.tb_model_kind.findFirst({ where: { id, is_deleted: false } })
    if (!is_exist) return { code: 400, msg: '失败:数据不存在', result: null }
    // 逻辑删除当前id的数据
    const data = await this.db.tb_model_kind.update({ where: { id }, data: { is_deleted: true } })
    return { code: 200, msg: '成功:删除-模型分类', result: data }
  }

  @ApiPost('update_model_kind', '更新-模型分类')
  async update_model_kind(@Body() body: update_model_kind) {
    // 判断是否存在
    const is_exist = await this.db.tb_model_kind.findFirst({ where: { id: body.id, is_deleted: false } })
    if (!is_exist) return { code: 400, msg: '失败:数据不存在', result: null }
    const data = await this.db.tb_model_kind.update({ where: { id: body.id }, data: { name: body.name, parent_id: body.parent_id } })
    return { code: 200, msg: '成功:更新-模型分类', result: data }
  }

  @ApiGet('get_tree_model_kind', '查询-模型分类-树状结构')
  async get_tree_model_kind() {
    // 获取所有分类数据
    const all_kinds = await this.db.tb_model_kind.findMany({ where: { is_deleted: false }, orderBy: { id: 'asc' } })
    // 构建树状结构
    const build_tree = (items: any[], parent_id: number | null = null): any[] => {
      return items.filter((item) => item.parent_id === parent_id).map((item) => ({ ...item, children: build_tree(items, item.id) }))
    }

    const tree_data = build_tree(all_kinds)
    console.log('get_tree_model_kind---tree_data:', JSON.stringify(tree_data, null, 2))
    return { code: 200, msg: '成功:查询-模型分类-树状结构', result: tree_data }
  }

  @ApiGet('init_model_kind', '初始-模型分类')
  @ApiQuery({ name: 'password', description: '初始化数据密码', required: true, type: Number })
  async init_model_kind(@Query('password', ParseIntPipe) password: number) {
    if (password !== 123456) return { code: 400, msg: '失败:初始化数据密码', result: null }
    await this.db.tb_model_kind.deleteMany()
    await this.db.tb_model_kind.create({ data: { id: 1, name: '汽车', children: { create: [{ name: '跑车' }, { name: '轿车' }, { name: 'SUV' }] } } })
    await this.db.tb_model_kind.create({ data: { id: 2, name: '飞机', children: { create: [{ name: '战斗机' }, { name: '轰炸机' }, { name: '运输机' }] } } })
    await this.db.tb_model_kind.create({ data: { id: 3, name: '人物', children: { create: [{ name: '男生' }, { name: '女生' }] } } })
    await this.db.tb_model_kind.create({ data: { id: 4, name: '动物', children: { create: [{ name: '狗' }, { name: '猫' }, { name: '猪' }] } } })
    await this.db.tb_model_kind.create({ data: { id: 5, name: '其他', children: { create: [] } } })

    // await this.db.tb_model_kind.create({
    //   data: {
    //     id: 1,
    //     name: '全部',
    //     children: {
    //       create: [
    //         {
    //           id: 2,
    //           name: '其他',
    //           children: { create: [] },
    //         },
    //         {
    //           id: 3,
    //           name: '汽车',
    //           children: { create: [{ name: '跑车' }, { name: '轿车' }, { name: 'SUV' }] },
    //         },

    //         {
    //           id: 4,
    //           name: '飞机',
    //           children: { create: [{ name: '战斗机' }, { name: '轰炸机' }, { name: '运输机' }] },
    //         },

    //         {
    //           id: 5,
    //           name: '人物',
    //           children: { create: [{ name: '男生' }, { name: '女生' }] },
    //         },

    //         {
    //           id: 6,
    //           name: '动物',
    //           children: { create: [{ name: '狗' }, { name: '猫' }, { name: '猪' }] },
    //         },
    //       ],
    //     },
    //   },
    // })

    const list = await this.db.tb_model_kind.findMany()
    return { code: 200, msg: '成功:初始-模型分类数据', result: { list } }
  }
}


@Module({
  controllers: [model_kind],
  providers: [],
})
export class model_kind_Module {}
