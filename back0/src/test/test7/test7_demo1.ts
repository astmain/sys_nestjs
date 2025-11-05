import { /*文档*/ ApiTags, ApiOperation, ApiOkResponse, ApiProperty } from '@nestjs/swagger'
import { /*接口*/ Controller, Body, Post } from '@nestjs/common'
import { /*api开发*/ Api_public } from '@src/App_Auth'
import { /*数据库*/ db } from '@src/App_Prisma'

import { applyDecorators } from '@nestjs/common'

// 创建装饰器工厂，返回一个装饰器函数
export function ApiPost(label: string, description?: string, Res_type?: any) {
  return function (target: object, propertyKey: string, descriptor: PropertyDescriptor) {
    // 使用 applyDecorators 组合多个装饰器
    const decorators = applyDecorators(
      ApiOkResponse({ description: '操作成功', type: Res_type }),
      Post(propertyKey), // 使用方法名作为路由路径
      ApiOperation({
        summary: label,
        description: `<h2 style="color: rgb(73, 204, 144) ;">[${label}]</h2>${description || ''}`,
      }),
    )

    // 应用装饰器到目标方法
    return decorators(target, propertyKey, descriptor)
  }
}

// dto
import { remove_test7_demo1 } from './dto/remove_test7_demo1'
export class test6_dto3 {
  @ApiProperty({ description: 'name_aaa2', example: 'a222' })
  name_aaa2: string = 'a222'
  @ApiProperty({ description: 'name_bbb2', example: 'b222' })
  name_bbb2: string = 'b222'
}

// vo
import { vo_remove_test7_demo1 } from './vo/vo_remove_test7_demo1'
import { vo_find_list_test7_demo1, item } from './vo/vo_find_list_test7_demo1'

// 导入严格类型检查工具

@Api_public()
@ApiTags('test7_demo1')
@Controller('test7_demo1')
export class test7_demo1 {
  @ApiPost('查询_用户信息_单个', '', test6_dto3)
  async find_one_test6_demo1(@Body() body: any) {
    console.log(`111---222:`, 1111)
    const one = await db.tb_test1.findFirst({ where: { password: '123456' } })
    return { code: 200, msg: '成111功', result: { one } }
  }

  @ApiPost('查询_用户信息_列表', '', vo_find_list_test7_demo1)
  async find_list_test6_demo1(@Body() body: any): Promise<vo_find_list_test7_demo1> {
    const list = await db.tb_test1.findMany({ where: { password: '123456' } })

    return {
      code: 200,
      msg: '成111功',
      result: { list: list },
    }
  }

  @ApiPost('保存_用户信息', '', test6_dto3)
  async save_test6_demo1(@Body() body: any) {
    console.log(`111---222:`, 1111)
    const one = await db.tb_test1.findFirst({ where: { password: '123456' } })
    return { code: 200, msg: '成111功', result: { name_aaa: '111' } }
  }

  @ApiPost('删除_用户信息', '', vo_remove_test7_demo1)
  async remove_test6_demo1(@Body() body: remove_test7_demo1): Promise<vo_remove_test7_demo1> {
    // await db.tb_test1.deleteMany({ where: { id: { in: body.ids } } }) // 批量物理删除
    await db.tb_test1.updateMany({ where: { id: { in: body.ids } }, data: { is_delete: true } }) // 批量逻辑删除
    return { code: 200, msg: '成111功', result: body }
  }
}
