import { ApiProperty, PickType } from '@nestjs/swagger'
import { IsNumber, IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator'


export class tb_model_kind {
  @ApiProperty({ description: 'id', example: 1 })
  @IsNumber()
  @IsNotEmpty({ message: 'id不能为空' })
  id: number

  @ApiProperty({ description: '名称', example: 'AI模型' })
  @IsString({ message: 'name必须为字符串' })
  @IsNotEmpty({ message: 'name不能为空' })
  name: string

  @ApiProperty({ description: '父级id', example: 1, required: false })
  @IsNumber()
  @IsOptional()
  parent_id?: number
}








