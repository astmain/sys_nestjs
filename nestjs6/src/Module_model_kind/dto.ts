import { ApiProperty, PickType } from '@nestjs/swagger'
import { IsNumber, IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator'

// 基础dto,方便其他dto集成减少冗余代码
export class model_kind_dto {
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

export class create_model_kind extends PickType(model_kind_dto, ['name', 'parent_id']) {}

export class update_model_kind extends PickType(model_kind_dto, ['id', 'name', 'parent_id']) {}

export class find_model_kind extends PickType(model_kind_dto, ['name']) {}

export class find_model_kind_by_free extends PickType(model_kind_dto, ['id']) {}
