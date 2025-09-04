import { OmitType, ApiProperty } from '@nestjs/swagger'
import { IsString, IsOptional } from 'class-validator'

import { tb_model_product } from './tb_model_product'

export class admin_save_model_product extends OmitType(tb_model_product, ['id']) {
  @ApiProperty({ description: 'id(id)', example: 'cuid_string', required: false })
  @IsString({ message: 'id必须为字符串' })
  @IsOptional()
  id?: string
}
