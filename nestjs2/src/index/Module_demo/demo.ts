// 通用包
import { AppController, ApiGet, ApiPost, ApiQuery, Controller, Module, Query, Body, ApiTags, ParseIntPipe } from '@src/Plugins/AppController'

// 自定义包
import { Dec_public } from '@src/AppAuthorized'

// 自定义dto
import * as dto from './dto'

@ApiTags('示例代码')
@Dec_public()
@Controller()
export class demo extends AppController {
  @ApiPost('create_demo', '创建数据')
  async create_demo(@Body() body: dto.create_demo) {
    console.log('create_demo---body:', body)
    const data = await this.db.tb_test.create({ data: { name: body.name, age: body.age } })
    return { code: 200, msg: '成功:创建数据', result: data }
  }

  @ApiPost('update_demo', '更新数据')
  async update_demo(@Body() body: dto.update_demo) {
    console.log('update_demo---body:', body)
    const data = await this.db.tb_test.update({ where: { id: body.id }, data: { name: body.name, age: body.age } })
    return { code: 200, msg: '成功:更新数据', result: data }
  }

  @ApiPost('find_demo', '查询数据')
  async find_demo(@Body() body: dto.find_demo) {
    console.log('find_demo---body:', body)
    const data = await this.db.tb_test.findMany({ where: { name: body.name } })
    console.log('find_demo---data:', data)
    return { code: 200, msg: '成功:测试数据', result: data }
  }

  @ApiGet('delete_demo', '删除id')
  @ApiQuery({ name: 'id', description: '删除id', required: true, type: Number, example: 1 })
  async delete_demo(@Query('id', ParseIntPipe) id: number) {
    console.log('delete_demo---id:', id, typeof id)
    const data = await this.db.tb_test.deleteMany({ where: { id: 1 } })
    return { code: 200, msg: '成功:删除id', result: data }
  }
}

@Module({
  controllers: [demo],
  providers: [],
})
export class Module_demo {}
