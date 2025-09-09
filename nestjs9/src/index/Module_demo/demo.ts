// 基础包
// 通常要使用的包(已经封装置AppController中,可以直接使用,减少import的容易引入)
import { AppController, ApiGet, ApiPost, ApiQuery, Controller, Module, Query, Body, ApiTags, ParseIntPipe } from '@src/Plugins/AppController'

// 开放接口
// 装饰器,开放接口,不需要验证
import { Dec_public } from '@src/AppAuthorized'

// 自定义dto
// dto  * as dto 统一到处方便使用
import * as dto from './dto'

@ApiTags('示例代码')
@Dec_public()
@Controller() //控制器层,定义接口,直接写业务代码,省略service层,更方便开发
export class demo extends AppController {
  @ApiPost('find_list_demo', '查询-数据-列表')
  async find_list_demo(@Body() body: dto.find_list_demo) {
    console.log('find_list_demo---body:', body)
    const list = await this.db.tb_demo.findMany({
      where: { name: { contains: body.name } },
      skip: (body.page_index - 1) * body.page_size,
      take: body.page_size,
      orderBy: { [body.order_by]: body.order_type } as any,
    })
    const count = await this.db.tb_demo.count({ where: { name: { contains: body.name } } })
    const page_total = Math.ceil(count / body.page_size)
    const pagination = { page_index: body.page_index, page_size: body.page_size, count_total: count, page_total: page_total }
    const result = { list, pagination }
    console.log('find_list_demo---data:', result)
    return { code: 200, msg: '成功:查询-数据-列表', result: result }
  }

  @ApiPost('find_info_demo', '查询-数据-详情')
  async find_info_demo(@Body() body: dto.find_info_demo) {
    console.log('find_info_demo---body:', body)
    const data = await this.db.tb_demo.findUnique({ where: { id: body.id } })
    console.log('find_info_demo---data:', data)
    return { code: 200, msg: '成功:查询-数据-详情', result: data }
  }

  @ApiPost('create_demo', '新增-数据')
  async create_demo(@Body() body: dto.create_demo) {
    console.log('create_demo---body:', body)
    const data = await this.db.tb_demo.create({
      data: { name: body.name, remark: body.remark, price_personal: body.price_personal, price_company: body.price_company, price_extend: body.price_extend },
    })
    return { code: 200, msg: '成功:新增-数据', result: data }
  }

  @ApiPost('update_demo', '更新-数据')
  async update_demo(@Body() body: dto.update_demo) {
    console.log('update_demo---body:', body)
    const data = await this.db.tb_demo.update({
      where: { id: body.id },
      data: { name: body.name, remark: body.remark, price_personal: body.price_personal, price_company: body.price_company, price_extend: body.price_extend },
    })
    return { code: 200, msg: '成功:更新-数据', result: data }
  }

  @ApiGet('delete_demo', '删除-id')
  @ApiQuery({ name: 'id', description: '删除-id', required: true, type: Number, example: 1 })
  async delete_demo(@Query('id', ParseIntPipe) id: number) {
    console.log('delete_demo---id:', id, typeof id)
    const data = await this.db.tb_demo.deleteMany({ where: { id: 1 } })
    return { code: 200, msg: '成功:删除-id', result: data }
  }

  @ApiPost('init_demo', '初始-数据')
  @ApiQuery({ name: 'password', description: '初始化数据密码', required: true, type: Number })
  async init_demo(@Query('password', ParseIntPipe) password: number) {
    if (password !== 123456) return { code: 400, msg: '失败:初始化数据密码', result: null }
    const data = await this.db.tb_demo.deleteMany()
    const list_img = [{ img: 'https://www.baidu.com/img/flexible/logo/pc/result.png' }]
    await this.db.tb_demo.create({ data: { id: 1, name: 'test', remark: 'test', price_personal: 1, price_company: 0, price_extend: 0, list_img } })
    await this.db.tb_demo.create({ data: { id: 2, name: 'test2', remark: 'test2', price_personal: 2, price_company: 0, price_extend: 0, list_img } })
    await this.db.tb_demo.create({ data: { id: 3, name: 'test3', remark: 'test3', price_personal: 3, price_company: 0, price_extend: 0, list_img } })
    await this.db.tb_demo.create({ data: { id: 4, name: 'test4', remark: 'test4', price_personal: 4, price_company: 0, price_extend: 0, list_img } })
    await this.db.tb_demo.create({ data: { id: 5, name: 'test5', remark: 'test5', price_personal: 5, price_company: 0, price_extend: 0, list_img } })
    await this.db.tb_demo.create({ data: { id: 6, name: 'test6', remark: 'test6', price_personal: 6, price_company: 0, price_extend: 0, list_img } })
    await this.db.tb_demo.create({ data: { id: 7, name: 'test7', remark: 'test7', price_personal: 7, price_company: 0, price_extend: 0, list_img } })
    await this.db.tb_demo.create({ data: { id: 8, name: 'test8', remark: 'test8', price_personal: 8, price_company: 0, price_extend: 0, list_img } })
    await this.db.tb_demo.create({ data: { id: 9, name: 'test9', remark: 'test9', price_personal: 9, price_company: 0, price_extend: 0, list_img } })
    await this.db.tb_demo.create({ data: { id: 10, name: 'test10', remark: 'test10', price_personal: 10, price_company: 0, price_extend: 0, list_img } })
    await this.db.tb_demo.create({ data: { id: 11, name: 'test11', remark: 'test11', price_personal: 11, price_company: 0, price_extend: 0, list_img } })
    await this.db.tb_demo.create({ data: { id: 12, name: 'test12', remark: 'test12', price_personal: 12, price_company: 0, price_extend: 0, list_img } })
    const list = await this.db.tb_demo.findMany({
      select: {
        id: true, //
        name: true,
        remark: true,
        price_personal: true,
        price_company: true,
        price_extend: true,
        list_img: true,
      },
    })
    return { code: 200, msg: '成功:初始-数据', result: { list } }
  }
}

// 模块层直接写在当前文件中,导入控制器层,方便其他模块导入使用
@Module({
  controllers: [demo],
  providers: [],
})
export class Module_demo {}
