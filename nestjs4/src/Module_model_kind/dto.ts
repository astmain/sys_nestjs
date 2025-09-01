import { ApiProperty, PickType } from '@nestjs/swagger'
import { IsString, IsOptional, IsNumber, IsEnum, IsNotEmpty } from 'class-validator'

export enum CategoryType {
  FREE = 'free',
  PAID = 'paid',
}

export enum CategoryStyle {
  SIMPLE = 'simple',
  MODERN = 'modern',
  INDUSTRIAL = 'industrial',
}

export enum CategoryFormat {
  STL = 'stl',
  OBJ = 'obj',
  IGS = 'igs',
}

export enum CategoryKind {
  PERSON = 'person',
  CAR = 'car',
  PLANE = 'plane',
  FURNITURE = 'furniture',
}

export enum FurnitureType {
  CHAIR = 'chair',
  BED = 'bed',
  TABLE = 'table',
  CABINET = 'cabinet',
}



export class model_kind_dto {
  @ApiProperty({ description: 'id', example: 1 })
  @IsNumber()
  @IsNotEmpty({ message: 'id不能为空' })
  id: number

  @ApiProperty({ description: '分类名称', example: '免费模型' })
  @IsString({ message: 'name必须为字符串' })
  @IsNotEmpty({ message: 'name不能为空' })
  name: string

  @ApiProperty({ description: '父级分类ID', example: null })
  @IsOptional()
  @IsNumber()
  parent_id?: number

  @ApiProperty({ description: '分类级别 (1-3)', example: 1 })
  @IsNumber()
  @IsNotEmpty({ message: 'level不能为空' })
  level: number

  @ApiProperty({ description: '分类类型', enum: CategoryType, example: CategoryType.FREE })
  @IsEnum(CategoryType, { message: 'category_type必须是有效的分类类型' })
  @IsNotEmpty({ message: 'category_type不能为空' })
  category_type: CategoryType

  @ApiProperty({ description: '风格分类', enum: CategoryStyle, required: false })
  @IsOptional()
  @IsEnum(CategoryStyle, { message: 'category_style必须是有效的风格类型' })
  category_style?: CategoryStyle

  @ApiProperty({ description: '格式分类', enum: CategoryFormat, required: false })
  @IsOptional()
  @IsEnum(CategoryFormat, { message: 'category_format必须是有效的格式类型' })
  category_format?: CategoryFormat

  @ApiProperty({ description: '种类分类', enum: CategoryKind, required: false })
  @IsOptional()
  @IsEnum(CategoryKind, { message: 'category_kind必须是有效的种类类型' })
  category_kind?: CategoryKind

  @ApiProperty({ description: '家具类型', enum: FurnitureType, required: false })
  @IsOptional()
  @IsEnum(FurnitureType, { message: 'furniture_type必须是有效的家具类型' })
  furniture_type?: FurnitureType


}

export class create_model_kind extends PickType(model_kind_dto, ['name', 'parent_id', 'level', 'category_type', 'category_style', 'category_format', 'category_kind', 'furniture_type']) {}

export class update_model_kind extends PickType(model_kind_dto, ['id', 'name', 'parent_id', 'level', 'category_type', 'category_style', 'category_format', 'category_kind', 'furniture_type']) {}

export class find_model_kind {
  @ApiProperty({ description: '分类级别', required: false, example: 1 })
  @IsOptional()
  @IsNumber()
  level?: number

  @ApiProperty({ description: '父级分类ID', required: false, example: null })
  @IsOptional()
  @IsNumber()
  parent_id?: number
}
