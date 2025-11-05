import { ApiProperty, PickType } from '@nestjs/swagger'
import { IsNumber, IsString, IsNotEmpty } from 'class-validator'
import { tb_model_cart } from './tb_model_cart'

export class find_list_model_card extends PickType(tb_model_cart, ['user_id']) {
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
