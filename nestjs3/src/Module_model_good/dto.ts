import { ApiProperty, PickType } from '@nestjs/swagger'
import { IsNumber, IsString, IsNotEmpty, IsOptional, IsIn } from 'class-validator'

export class model_good_dto {
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

  @ApiProperty({ description: '是否删除', example: false })
  @IsOptional()
  is_deleted?: boolean

  @ApiProperty({ description: '是否发布', example: false })
  @IsOptional()
  is_published?: boolean
}

export class create_model_good extends PickType(model_good_dto, ['model_id', 'title', 'description', 'author_name', 'author_id', 'count_collect', 'count_download', 'price_30', 'price_all']) {}

export class update_model_good extends PickType(model_good_dto, ['id', 'model_id', 'title', 'description', 'author_name', 'author_id', 'count_collect', 'count_download', 'price_30', 'price_all']) {}

// 发布状态更新DTO
export class update_publish_status {
  @ApiProperty({ description: '模型商品id', example: 1 })
  @IsNumber()
  @IsNotEmpty({ message: 'id不能为空' })
  id: number

  @ApiProperty({ description: '是否发布', example: true })
  @IsOptional()
  is_published?: boolean
}

// 查询模型DTO（按收藏数排序）
export class find_model_good {
  @ApiProperty({ description: '标题', example: 'AI绘画模型', required: false })
  @IsString({ message: 'title必须为字符串' })
  @IsOptional()
  title?: string

  @ApiProperty({ description: '作者名称', example: '张三', required: false })
  @IsString({ message: 'author_name必须为字符串' })
  @IsOptional()
  author_name?: string

  @ApiProperty({ description: '页码', example: 1, required: true })
  @IsNumber()
  @IsOptional()
  page_index?: number

  @ApiProperty({ description: '每页数量[10,20,50,100]', example: 10, required: true })
  @IsNumber()
  @IsOptional()
  @IsIn([10, 20, 50, 100], { message: 'page_size必须是10,20,50,100' })
  page_size?: number

  @ApiProperty({ description: '排序字段', example: 'count_collect', required: false })
  @IsString({ message: 'order_by必须为字符串' })
  @IsOptional()
  @IsIn(['count_collect', 'count_download', 'price_30', 'price_all'], { message: 'order_by必须是:count_collect,count_download,price_30,price_all' })
  order_by?: string

  @ApiProperty({ description: '排序方式[asc,desc]', example: 'desc', required: false })
  @IsString({ message: 'order_type必须为字符串' })
  @IsOptional()
  @IsIn(['asc', 'desc'], { message: 'order_type必须是asc或desc' })
  order_type?: string

  @ApiProperty({ description: '是否包含已删除记录', example: false, required: false })
  @IsOptional()
  include_deleted?: boolean

  @ApiProperty({ description: '是否只查询已发布的', example: true, required: false })
  @IsOptional()
  only_published?: boolean
}
