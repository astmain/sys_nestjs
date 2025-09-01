import { ApiProperty, PickType, PartialType, OmitType } from '@nestjs/swagger'
import { IsNumber, IsString, IsNotEmpty, IsOptional, IsIn, IsBoolean, IsArray } from 'class-validator'

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
  title: string = ''

  @ApiProperty({ description: '描述', example: '这是一个强大的AI绘画模型' })
  @IsString({ message: 'description必须为字符串' })
  @IsNotEmpty({ message: 'description不能为空' })
  description: string = ''

  @ApiProperty({ description: '作者名称', example: '张三' })
  @IsString({ message: 'author_name必须为字符串' })
  @IsNotEmpty({ message: 'author_name不能为空' })
  author_name: string = ''

  @ApiProperty({ description: '作者id', example: 'author_001' })
  @IsString({ message: 'author_id必须为字符串' })
  @IsNotEmpty({ message: 'author_id不能为空' })
  author_id: string = ''

  @ApiProperty({ description: '收藏数', example: 100 })
  @IsNumber()
  @IsNotEmpty({ message: 'count_collect不能为空' })
  count_collect: number = 0

  @ApiProperty({ description: '下载数', example: 500 })
  @IsNumber()
  @IsNotEmpty({ message: 'count_download不能为空' })
  count_download: number = 0

  @ApiProperty({ description: '授权个人', example: 29.9 })
  @IsNumber()
  @IsNotEmpty({ message: 'price_personal不能为空' })
  price_personal: number = 0

  @ApiProperty({ description: '授权公司', example: 29.9 })
  @IsNumber()
  @IsNotEmpty({ message: 'price_company不能为空' })
  price_company: number = 0

  @ApiProperty({ description: '授权扩展', example: 29.9 })
  @IsNumber()
  @IsNotEmpty({ message: 'price_extend不能为空' })
  price_extend: number = 0

  @ApiProperty({ description: '是否删除', example: false })
  @IsOptional()
  is_deleted?: boolean = false

  @ApiProperty({ description: '是否发布', example: true })
  @IsOptional()
  is_published?: boolean = true

  @ApiProperty({ description: '是否审核通过', example: false })
  @IsOptional()
  is_check?: boolean = false

  @ApiProperty({ description: '审核备注', example: '审核通过', required: false })
  @IsString({ message: 'is_check_remark必须为字符串' })
  @IsOptional()
  is_check_remark?: string = ''

  @ApiProperty({ description: '是否免费', example: true, required: false })
  @IsBoolean()
  @IsOptional()
  is_free?: boolean = true

  @ApiProperty({ description: '是否商用', example: false, required: false })
  @IsBoolean()
  @IsOptional()
  is_business?: boolean = false

  @ApiProperty({ description: '是否有骨骼', example: false, required: false })
  @IsBoolean()
  @IsOptional()
  is_skeleton?: boolean = false

  @ApiProperty({ description: '是否有动画', example: false, required: false })
  @IsBoolean()
  @IsOptional()
  is_animation?: boolean = false

  @ApiProperty({ description: '模型格式', example: '.stl', required: false })
  @IsString({ message: 'model_format必须为字符串' })
  @IsOptional()
  model_format?: string = '.stl'

  @ApiProperty({ description: '贴图(JSON数组)', example: [], required: false })
  @IsArray()
  @IsOptional()
  model_texture?: any[] = []

  @ApiProperty({ description: '面片数', example: '5k以下', required: false })
  @IsString({ message: 'area_unit必须为字符串' })
  @IsOptional()
  area_unit?: string = '5k以下'

  @ApiProperty({ description: '布线', example: '三角形', required: false })
  @IsString({ message: 'wiring必须为字符串' })
  @IsOptional()
  wiring?: string = '三角形'
}

export class create_model_good extends PickType(model_good_dto, [
  'model_id',
  'title',
  'description',
  'author_name',
  'author_id',
  'count_collect',
  'count_download',
  'is_published',
  'price_personal',
  'price_company',
  'price_extend',
  'is_free',
  'is_business',
  'is_skeleton',
  'is_animation',
  'model_format',
  'model_texture',
  'area_unit',
  'wiring',
]) {}

export class update_model_good extends PickType(model_good_dto, [
  'id',
  'model_id',
  'title',
  'description',
  'author_name',
  'author_id',
  'count_collect',
  'count_download',
  'is_published',
  'price_personal',
  'price_company',
  'price_extend',
  'is_free',
  'is_business',
  'is_skeleton',
  'is_animation',
  'model_format',
  'model_texture',
  'area_unit',
  'wiring',
]) {}

export class save_admin_model_good extends PartialType(OmitType(model_good_dto, ['id'] as const)) {
  @ApiProperty({ description: 'id', example: 1, required: false })
  @IsNumber()
  @IsOptional()
  id?: number
}

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

// 审核状态更新DTO
export class update_approval_status {
  @ApiProperty({ description: '模型商品id', example: 1 })
  @IsNumber()
  @IsNotEmpty({ message: 'id不能为空' })
  id: number

  @ApiProperty({ description: '是否审核通过', example: true })
  @IsOptional()
  is_check?: boolean

  @ApiProperty({ description: '审核备注', example: '审核通过', required: false })
  @IsString({ message: 'is_check_remark必须为字符串' })
  @IsOptional()
  is_check_remark?: string
}

// 查询模型DTO（按收藏数排序）
export class find_list_model_good {
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
  @IsIn(['count_collect', 'count_download', 'price_personal', 'price_company', 'price_extend'], { message: 'order_by必须是:count_collect,count_download,price_personal,price_company,price_extend' })
  order_by?: string

  @ApiProperty({ description: '排序方式[asc,desc]', example: 'desc', required: false })
  @IsString({ message: 'order_type必须为字符串' })
  @IsOptional()
  @IsIn(['asc', 'desc'], { message: 'order_type必须是asc或desc' })
  order_type?: string

  @ApiProperty({ description: '是否包含已删除记录', example: false, required: false })
  @IsOptional()
  is_deleted?: boolean

  @ApiProperty({ description: '是否只查询已发布的', example: true, required: false })
  @IsOptional()
  is_published?: boolean

  @ApiProperty({ description: '是否只查询已审核通过的', example: true, required: false })
  @IsOptional()
  is_check?: boolean
}
