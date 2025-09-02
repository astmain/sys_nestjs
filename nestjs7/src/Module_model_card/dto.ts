import { ApiProperty, PickType } from '@nestjs/swagger'
import { IsNumber, IsString, IsNotEmpty, IsOptional } from 'class-validator'

// 基础dto,方便其他dto集成减少冗余代码(这是基础的dto,其他dto继承自这个dto,这个dto和数据表的字段名一致)
export class model_card_dto {
  @ApiProperty({ description: 'id', example: 'cuid_string' })
  @IsString({ message: 'id必须为字符串' })
  @IsNotEmpty({ message: 'id不能为空' })
  id: string

  @ApiProperty({ description: 'user_id(用户id)', example: 1 })
  @IsNumber()
  @IsNotEmpty({ message: 'user_id不能为空' })
  user_id: number

  @ApiProperty({ description: 'product_id(商品id)', example: 'cuid_string' })
  @IsString({ message: 'product_id必须为字符串' })
  @IsNotEmpty({ message: 'product_id不能为空' })
  product_id: string
}

// create_model_card命名规范和接口的函数名统一一致性,方便阅读
export class create_model_card extends PickType(model_card_dto, ['user_id', 'product_id']) {}

// update_model_card命名规范和接口的函数名统一一致性,方便阅读
export class update_model_card extends PickType(model_card_dto, ['id', 'user_id', 'product_id']) {}

// find_list_model_card命名规范和接口的函数名统一一致性,方便阅读
export class find_list_model_card extends PickType(model_card_dto, ['user_id']) {
  @ApiProperty({ description: '页码', example: 1, required: true })
  @IsNumber()
  page_index: number = 1

  @ApiProperty({ description: '每页数量', example: 10, required: true })
  @IsNumber()
  page_size: number = 10

  @ApiProperty({ description: '排序字段', example: 'created_at', required: true })
  @IsString()
  order_by: string = 'created_at'

  @ApiProperty({ description: '排序方式', example: 'desc', required: true })
  @IsString()
  order_type: string = 'desc'
}

// find_info_model_card命名规范和接口的函数名统一一致性,方便阅读
export class find_info_model_card extends PickType(model_card_dto, ['id']) {}
