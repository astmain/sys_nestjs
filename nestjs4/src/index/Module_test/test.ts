import { Get, Controller, Module, Query } from '@nestjs/common'
import { ApiOperation, ApiQuery } from '@nestjs/swagger'
import { ParseIntPipe } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

// 自定义包
import { Dec_public } from '@src/AppAuthorized'
import { AppController, ApiGet } from '@src/Plugins/AppController'

@ApiTags('测试')
@Dec_public()
@Controller()
export class test extends AppController {
  @Get('test_create')
  @ApiOperation({ summary: '测试创建数据' })
  async test_create() {}

  @Get('update_delete')
  @ApiOperation({ summary: '测试更新数据' })
  async update_delete() {}

  @Get('test_find')
  @ApiOperation({ summary: '测试查询数据' })
  async test_find() {}

  @ApiGet('test_delete', '测试删除数据', '删除')
  @ApiQuery({ name: 'id', description: '要删除的记录ID', required: true, type: Number, example: 1 })
  async test_delete(@Query('id', ParseIntPipe) id: number) {
    console.log('test_delete---id:', id, typeof id)
  }
}

@Module({
  controllers: [test],
  providers: [],
})
export class Module_test {}
