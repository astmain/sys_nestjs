import { ApiProperty, PickType } from '@nestjs/swagger'
import { IsNumber, IsString, IsNotEmpty, IsOptional } from 'class-validator'

export class model_shop_dto {
  @ApiProperty({ description: 'id', example: 1 })
  @IsNumber()
  @IsNotEmpty({ message: 'id不能为空' })
  id: number

  @ApiProperty({ description: '模型id', example: 'model_001' })
  @IsString({ message: 'model_id必须为字符串' })
  @IsNotEmpty({ message: 'model_id不能为空' })
  model_id: string

  @ApiProperty({ description: '标题', example: 'AI绘画模型' })
  @IsString({ message: 'title必须为字符串' })
  @IsNotEmpty({ message: 'title不能为空' })
  title: string

  @ApiProperty({ description: '描述', example: '这是一个强大的AI绘画模型' })
  @IsString({ message: 'description必须为字符串' })
  @IsNotEmpty({ message: 'description不能为空' })
  description: string

  @ApiProperty({ description: '作者名称', example: '张三' })
  @IsString({ message: 'author_name必须为字符串' })
  @IsNotEmpty({ message: 'author_name不能为空' })
  author_name: string

  @ApiProperty({ description: '作者id', example: 'author_001' })
  @IsString({ message: 'author_id必须为字符串' })
  @IsNotEmpty({ message: 'author_id不能为空' })
  author_id: string

  @ApiProperty({ description: '收藏数', example: 100 })
  @IsNumber()
  @IsNotEmpty({ message: 'count_collect不能为空' })
  count_collect: number

  @ApiProperty({ description: '下载数', example: 500 })
  @IsNumber()
  @IsNotEmpty({ message: 'count_download不能为空' })
  count_download: number

  @ApiProperty({ description: '授权价30天', example: 29.9 })
  @IsNumber()
  @IsNotEmpty({ message: 'price_30不能为空' })
  price_30: number

  @ApiProperty({ description: '授权永久', example: 199.9 })
  @IsNumber()
  @IsNotEmpty({ message: 'price_all不能为空' })
  price_all: number
}

export class create_model_shop extends PickType(model_shop_dto, ['model_id', 'title', 'description', 'author_name', 'author_id', 'count_collect', 'count_download', 'price_30', 'price_all']) {}

export class update_model_shop extends PickType(model_shop_dto, ['id', 'model_id', 'title', 'description', 'author_name', 'author_id', 'count_collect', 'count_download', 'price_30', 'price_all']) {}

export class find_model_shop {
  @ApiProperty({ description: '标题', example: 'AI绘画模型', required: false })
  @IsString({ message: 'title必须为字符串' })
  @IsOptional()
  title?: string

  @ApiProperty({ description: '作者名称', example: '张三', required: false })
  @IsString({ message: 'author_name必须为字符串' })
  @IsOptional()
  author_name?: string
} 