import { ApiProperty, PickType } from '@nestjs/swagger'
import { IsNumber, IsString, IsNotEmpty, IsOptional, IsArray, IsEnum, IsIn } from 'class-validator'

// 订单状态枚举
export enum enum_order_status {
  PAYING = 'PAYING',//待支付
  PAYED = 'PAYED',//已支付
  SHIPPED = 'SHIPPED',//已发货
  CANCELLED = 'CANCELLED',//已取消
}

// 订单列表基础dto
export class model_order_list_dto {
  @ApiProperty({ description: 'id', example: 'cuid_string' })
  @IsString({ message: 'id必须为字符串' })
  @IsNotEmpty({ message: 'id不能为空' })
  id: string

  @ApiProperty({ description: 'order_number(订单号)', example: 'ORD20231201001' })
  @IsString({ message: 'order_number必须为字符串' })
  @IsNotEmpty({ message: 'order_number不能为空' })
  order_number: string

  @ApiProperty({ description: 'user_id(用户id)', example: 1 })
  @IsNumber()
  @IsNotEmpty({ message: 'user_id不能为空' })
  user_id: number

  @ApiProperty({ description: 'price_sub(减去价格)', example: 0 })
  @IsNumber()
  @IsOptional()
  price_sub: number

  @ApiProperty({ description: 'price_order(订单价格)', example: 100 })
  @IsNumber()
  @IsNotEmpty({ message: 'price_order不能为空' })
  price_order: number

  @ApiProperty({ description: 'price_pay(支付价格)', example: 100 })
  @IsNumber()
  @IsNotEmpty({ message: 'price_pay不能为空' })
  price_pay: number

  @ApiProperty({ description: 'status(订单状态)', example: 'PAYING', enum: [...Object.values(enum_order_status), ''] })
  @IsIn([...Object.values(enum_order_status), ''], { message: 'status必须是有效的订单状态或空字符串' })
  @IsOptional()
  status: enum_order_status | ''
}

// 订单详情基础dto
export class model_order_info_dto {
  @ApiProperty({ description: 'id', example: 'cuid_string' })
  @IsString({ message: 'id必须为字符串' })
  @IsNotEmpty({ message: 'id不能为空' })
  id: string

  @ApiProperty({ description: 'order_number(订单号)', example: 'ORD20231201001' })
  @IsString({ message: 'order_number必须为字符串' })
  @IsNotEmpty({ message: 'order_number不能为空' })
  order_number: string

  @ApiProperty({ description: 'product_id(商品id)', example: 'cuid_string' })
  @IsString({ message: 'product_id必须为字符串' })
  @IsNotEmpty({ message: 'product_id不能为空' })
  product_id: string

  @ApiProperty({ description: 'price_one(单价)', example: 100 })
  @IsNumber()
  @IsNotEmpty({ message: 'price_one不能为空' })
  price_one: number

  @ApiProperty({ description: 'count(数量)', example: 1 })
  @IsNumber()
  @IsOptional()
  count: number
}

// 创建订单dto
export class create_model_order {


  @ApiProperty({ description: 'price_sub(减去价格)', example: 0 })
  @IsNumber()
  @IsOptional()
  price_sub: number

  @ApiProperty({ description: 'order_items(订单商品列表)', example: [{ product_id: 'cuid_string', price_one: 100, count: 1 }] })
  @IsArray()
  @IsNotEmpty({ message: 'order_items不能为空' })
  order_items: Array<{
    product_id: string
    price_one: number
    count: number
  }>
}

// 更新订单状态dto
export class update_model_order_status {
  @ApiProperty({ description: 'order_number(订单号)', example: 'ORD20231201001' })
  @IsString({ message: 'order_number必须为字符串' })
  @IsNotEmpty({ message: 'order_number不能为空' })
  order_number: string

  @ApiProperty({ description: 'status(订单状态)', example: 'PROCESSING', enum: enum_order_status })
  @IsIn([...Object.values(enum_order_status), ''], { message: 'status必须是有效的订单状态或空字符串' })
  @IsNotEmpty({ message: 'status不能为空' })
  status: enum_order_status | ''
}

// 查询订单列表dto
export class find_list_model_order {
  @ApiProperty({ description: 'user_id(用户id)', example: 1 })
  @IsNumber()
  @IsOptional()
  user_id: number

  @ApiProperty({ description: 'order_number(订单号)', example: 'ORD20231201001' })
  @IsString()
  @IsOptional()
  order_number: string

  @ApiProperty({ description: 'status(订单状态)', example: 'PAYING', enum: [...Object.values(enum_order_status), ''] })
  @IsIn([...Object.values(enum_order_status), ''], { message: 'status必须是有效的订单状态或空字符串' })
  @IsOptional()
  status: enum_order_status | ''

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

// 查询订单详情dto
export class find_info_model_order {
  @ApiProperty({ description: 'order_number(订单号)', example: 'ORD20231201001' })
  @IsString({ message: 'order_number必须为字符串' })
  @IsNotEmpty({ message: 'order_number不能为空' })
  order_number: string
}
