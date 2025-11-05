import { /*文档*/ ApiTags, ApiOperation, ApiOkResponse, ApiProperty, ApiBody, ApiExtraModels } from '@nestjs/swagger'
import { /*接口*/ Controller, Get, Inject, Body, Post } from '@nestjs/common'
import { /*api开发*/ Api_public } from '@src/App_Auth'
import { /*数据库*/ db } from '@src/App_Prisma'
import { IsString } from 'class-validator'

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
import { remove_test6_demo1 } from './dto/remove_test6_demo1'
export class test6_dto3 {
  @ApiProperty({ description: 'name_aaa2', example: 'a222' })
  name_aaa2: string = 'a222'
  @ApiProperty({ description: 'name_bbb2', example: 'b222' })
  name_bbb2: string = 'b222'
}

// vo
import { vo_remove_test6_demo1 } from './vo/vo_remove_test6_demo1'
import { vo_find_list_test6_demo11 } from './vo/vo_find_list_test6_demo1'

@Api_public()
@ApiTags('test6_demo1')
@Controller('test6_demo1')
export class test6_demo1 {
  @ApiPost('查询_用户信息_单个', '', test6_dto3)
  async find_one_test6_demo1(@Body() body: any) {
    console.log(`111---222:`, 1111)
    const one = await db.tb_test1.findFirst({ where: { password: '123456' } })
    return { code: 200, msg: '成111功', result: { one } }
  }

  @ApiPost('查询_用户信息_列表', '', vo_find_list_test6_demo11)
  async find_list_test6_demo1(@Body() body: any): Promise<vo_find_list_test6_demo11> {
    const list = await db.tb_test1.findMany({ where: { password: '123456' } })
    // return { code: 200, msg: '成111功', result: { list } } //我应该怎么写 vo_find_list_test6_demo1
    console.log(`111---list:`, list)
    return { code: 200, msg: '成111功', result: { list: list } }

    let result的数据 = {
      list: [
        {
          id: 214,
          phone: '1-1',
          password: '123456',
          is_delete: false,
          is_check: true,
          is_active: true,
          is_public: true,
          list_file: [],
          list_img: [],
          list_extend: [],
          type_format: '.png',
          type_area: '三角',
          type_point: '3k以下',
          created_at: '2025-09-11T16:57:10.847Z',
          updated_at: '2025-09-11T16:57:10.847Z',
        },
      ],
    }
  }

  @ApiPost('保存_用户信息', '', test6_dto3)
  async save_test6_demo1(@Body() body: any) {
    console.log(`111---222:`, 1111)
    const one = await db.tb_test1.findFirst({ where: { password: '123456' } })
    return { code: 200, msg: '成111功', result: { name_aaa: '111' } }
  }

  @ApiPost('删除_用户信息', '', vo_remove_test6_demo1)
  async remove_test6_demo1(@Body() body: remove_test6_demo1): Promise<vo_remove_test6_demo1> {
    // await db.tb_test1.deleteMany({ where: { id: { in: body.ids } } }) // 批量物理删除
    await db.tb_test1.updateMany({ where: { id: { in: body.ids } }, data: { is_delete: true } }) // 批量逻辑删除
    return { code: 200, msg: '成111功', result: body }
  }
}
