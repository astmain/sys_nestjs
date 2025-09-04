import { ApiProperty, PickType } from '@nestjs/swagger'
import { IsNumber, IsString, IsNotEmpty, IsOptional, IsIn } from 'class-validator'
export class tb_model_cart {
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

  @ApiProperty({ description: '价格类型price_personal(个人价格),price_company(企业价格),price_extend(扩展价格)', example: 'price_personal(个人价格),price_company(企业价格),price_extend(扩展价格)' })
  @IsIn(['price_personal', 'price_company', 'price_extend'])
  price_type: string = 'price_personal'
}
