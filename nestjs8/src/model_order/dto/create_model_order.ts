// cart_id_list_select

import { ApiProperty, PickType } from '@nestjs/swagger'
import { IsString, IsOptional, IsNumber, Min, IsArray, IsNotEmpty, ArrayNotEmpty } from 'class-validator'

export class create_model_order {
  @ApiProperty({ description: '订单用户id', example: 1 })
  @IsNumber()
  @IsNotEmpty({ message: '用户id不能为空' })
  user_id: number

  @ApiProperty({ description: '购物车id列表', example: ['111', '111'] })
  @IsArray()
  @ArrayNotEmpty({ message: '购物车id列表不能为空' })
  @IsString({ each: true, message: '购物车id列表必须是字符串' }) //并且数据不能是空的
  cart_id_list_select: string[]
}
