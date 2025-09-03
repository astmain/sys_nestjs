import { ApiProperty, PickType } from '@nestjs/swagger'
import { IsNumber, IsString, IsNotEmpty, IsOptional, IsIn } from 'class-validator'

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

  @ApiProperty({ description: 'price(价格)', example: 100 })
  @IsNumber()
  @IsNotEmpty({ message: 'price不能为空' })
  price: number

  @ApiProperty({ description: '价格类型price_personal(个人价格),price_company(企业价格),price_extend(扩展价格)', example: 'price_personal(个人价格),price_company(企业价格),price_extend(扩展价格)' })
  @IsIn(['price_personal', 'price_company', 'price_extend'])
  price_type: string = 'price_personal'
}

// create_model_card命名规范和接口的函数名统一一致性,方便阅读
export class create_model_card extends PickType(model_card_dto, ['product_id', 'user_id', 'price', 'price_type']) {}

// update_model_card命名规范和接口的函数名统一一致性,方便阅读
export class update_model_card extends PickType(model_card_dto, ['id', 'product_id', 'user_id', 'price', 'price_type']) {}

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
  @ApiProperty({ description: 'user_id(用户id)', example: 1 })
  @IsNumber()
  @IsNotEmpty({ message: 'user_id不能为空' })
  user_id: number
}


export class find_info_model_card extends PickType(model_card_dto, ['id']) {}


export class save_model_card extends PickType(model_card_dto, ['product_id', 'user_id', 'price', 'price_type']) {
  @ApiProperty({ description: 'id(id)', example: 'cuid_string', required: false })
  @IsString({ message: 'id必须为字符串' })
  @IsOptional()
  id?: string
}