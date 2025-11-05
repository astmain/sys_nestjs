import { ApiProperty, PickType } from '@nestjs/swagger'
import { IsString, IsOptional, IsNumber, Min } from 'class-validator'
import { tb_model_cart } from './tb_model_cart'


export class save_model_card extends PickType(tb_model_cart, ['product_id', 'user_id', 'price_type']) {
  @ApiProperty({ description: 'id(id)', example: 'cuid_string', required: false })
  @IsString({ message: 'id必须为字符串' })
  @IsOptional()
  id?: string
  @ApiProperty({ description: 'count(数量)', example: 1, required: false })
  @IsNumber()
  @Min(0, { message: 'count必须大于等于0' })
  count: number
}
