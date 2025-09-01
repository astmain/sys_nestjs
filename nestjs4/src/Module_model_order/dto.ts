import { ApiProperty, PickType } from '@nestjs/swagger'
import { IsNumber, IsString, IsNotEmpty, IsOptional, IsIn } from 'class-validator'

export class model_order_dto {
  @ApiProperty({ description: 'id', example: 1 })
  @IsNumber()
  @IsNotEmpty({ message: 'id不能为空' })
  id: number

  @ApiProperty({ description: '模型的订单id', example: 'order_001' })
  @IsString({ message: 'model_order_id必须为字符串' })
  @IsNotEmpty({ message: 'model_order_id不能为空' })
  model_order_id: string

  @ApiProperty({ description: '订单状态', example: '待支付', enum: ['待支付', '已支付'] })
  @IsString({ message: 'status必须为字符串' })
  @IsNotEmpty({ message: 'status不能为空' })
  @IsIn(['待支付', '已支付'], { message: 'status必须是待支付或已支付' })
  status: string
}

export class create_model_order extends PickType(model_order_dto, ['model_order_id', 'status']) {}

export class update_model_order extends PickType(model_order_dto, ['id', 'model_order_id', 'status']) {}

export class find_model_order {
  @ApiProperty({ description: '模型的订单id', example: 'order_001', required: false })
  @IsString({ message: 'model_order_id必须为字符串' })
  @IsOptional()
  model_order_id?: string

  @ApiProperty({ description: '订单状态', example: '待支付', required: false, enum: ['待支付', '已支付'] })
  @IsString({ message: 'status必须为字符串' })
  @IsOptional()
  @IsIn(['待支付', '已支付'], { message: 'status必须是待支付或已支付' })
  status?: string
}

// 分页查询DTO
export class find_model_order_page {
  @ApiProperty({ description: '模型的订单id', example: 'order_001', required: false })
  @IsString({ message: 'model_order_id必须为字符串' })
  @IsOptional()
  model_order_id?: string

  @ApiProperty({ description: '订单状态', example: '待支付', required: false, enum: ['待支付', '已支付'] })
  @IsString({ message: 'status必须为字符串' })
  @IsOptional()
  @IsIn(['待支付', '已支付'], { message: 'status必须是待支付或已支付' })
  status?: string

  @ApiProperty({ description: '页码', example: 1, required: false })
  @IsNumber()
  @IsOptional()
  page_index?: number

  @ApiProperty({ description: '每页数量', example: 10, required: false })
  @IsNumber()
  @IsOptional()
  page_size?: number
} 