import { ApiProperty, PickType } from '@nestjs/swagger'
import { IsString, IsOptional } from 'class-validator'
import { tb_model_cart } from './tb_model_cart'

// save_model_card命名规范和接口的函数名统一一致性,方便阅读

export class save_model_card extends PickType(tb_model_cart, ['product_id', 'user_id', 'price_type']) {
  @ApiProperty({ description: 'id(id)', example: 'cuid_string', required: false })
  @IsString({ message: 'id必须为字符串' })
  @IsOptional()
  id?: string
}
