import { ApiProperty, PickType } from '@nestjs/swagger'
import { IsNumber, IsString, IsNotEmpty } from 'class-validator'

export class find_list_model_order {
  @ApiProperty({ description: 'user_id(用户id)', example: 1 })
  @IsNumber()
  @IsNotEmpty({ message: 'user_id不能为空' })
  user_id: number

  @ApiProperty({ description: '订单号', example: '' })
  @IsString()
  order_number: string

  @ApiProperty({ description: '订单状态', example: '' })
  @IsString()
  status: string

  @ApiProperty({ description: '页码', example: 1 })
  @IsNumber()
  page_index: number

  @ApiProperty({ description: '每页数量', example: 10 })
  @IsNumber()
  page_size: number

  @ApiProperty({ description: '排序字段', example: 'created_at' })
  @IsString()
  order_by: string

  @ApiProperty({ description: '排序方式', example: 'desc' })
  @IsString()
  order_type: string
}
