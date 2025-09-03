import { ApiProperty, PickType } from '@nestjs/swagger'
import { IsNumber, IsString, IsNotEmpty, IsOptional, IsBoolean, IsArray } from 'class-validator'
import { Type } from 'class-transformer'

// 基础dto,方便其他dto集成减少冗余代码(这是基础的dto,其他dto继承自这个dto,这个dto和数据表的字段名一致)
export class model_product_dto {
  @ApiProperty({ description: 'id', example: 'cuid_string' })
  @IsString({ message: 'id必须为字符串' })
  @IsNotEmpty({ message: 'id不能为空' })
  id: string

  @ApiProperty({ description: 'user_id(用户id)', example: 1 })
  @IsNumber()
  @IsNotEmpty({ message: 'user_id不能为空' })
  user_id: number

  @ApiProperty({ description: 'title(标题)', example: '商品标题' })
  @IsString({ message: 'title必须为字符串' })
  title: string

  @ApiProperty({ description: 'remark(备注)', example: '商品备注' })
  @IsString({ message: 'remark必须为字符串' })
  @IsOptional()
  remark: string

  @ApiProperty({ description: 'price(价格)', example: 100 })
  @IsNumber()
  @Type(() => Number) // 转换为数字
  // @IsNotEmpty({ message: 'price不能为空' })
  price: number = 0

  @ApiProperty({ description: 'is_public(是否公开)', example: true })
  @IsBoolean()
  @IsOptional()
  is_public: boolean

  @ApiProperty({ description: 'list_img(图片列表)', example: [{ url: 'https://www.baidu.com/img/flexible/logo/pc/result.png' }] })
  @IsArray()
  list_img: any[] = []

  @ApiProperty({ description: 'list_file(文件列表)', example: [{ url: 'https://www.baidu.com/img/flexible/logo/pc/result.png' }] })
  @IsArray()
  list_file: any[] = []

  @ApiProperty({ description: 'list_video(视频列表)', example: [{ url: 'https://www.baidu.com/img/flexible/logo/pc/result.png' }] })
  @IsArray()
  list_video: any[] = []

  @ApiProperty({ description: 'list_extend(附件列表)', example: [{ url: 'https://www.baidu.com/img/flexible/logo/pc/result.png' }] })
  @IsArray()
  list_extend: any[] = []

  @ApiProperty({ description: 'list_texture(贴图列表)', example: [{ url: 'https://www.baidu.com/img/flexible/logo/pc/result.png' }] })
  @IsArray()
  list_texture: any[] = []

  @ApiProperty({ description: 'is_check(是否审核)', example: true })
  @IsBoolean()
  @IsOptional()
  is_check: boolean = false

  @ApiProperty({ description: 'is_check_remark(审核备注)', example: '审核通过' })
  @IsString()
  @IsOptional()
  is_check_remark: string = ''

  @ApiProperty({ description: 'is_business(是否商用)', example: true })
  @IsBoolean()
  @IsOptional()
  is_business: boolean = false

  @ApiProperty({ description: 'is_skeleton(是否有骨骼)', example: true })
  @IsBoolean()
  @IsOptional()
  is_skeleton: boolean = false

  @ApiProperty({ description: 'is_animation(是否有动画)', example: true })
  @IsBoolean()
  @IsOptional()
  is_animation: boolean = false

  @ApiProperty({ description: 'model_format(模型格式)', example: '.stl' })
  @IsString()
  @IsOptional()
  model_format: string = '.stl'

  @ApiProperty({ description: 'area_unit(面片数)', example: '5k以下' })
  @IsString()
  @IsOptional()
  area_unit: string = '5k以下'

  @ApiProperty({ description: 'wiring(布线)', example: '三角形' })
  @IsString()
  @IsOptional()
  wiring: string = '三角形'
}

export class create_model_product extends PickType(model_product_dto, ['title', 'remark', 'price', 'is_public', 'list_img', 'list_file', 'list_video', 'list_extend']) {}

export class update_model_product extends PickType(model_product_dto, ['id', 'title', 'remark', 'price', 'is_public', 'list_img', 'list_file', 'list_video', 'list_extend']) {}

export class find_list_model_product extends PickType(model_product_dto, ['title']) {
  @ApiProperty({ description: '页码', example: 1, required: true })
  @IsNumber()
  page_index: number = 1

  @ApiProperty({ description: '每页数量', example: 10, required: true })
  @IsNumber()
  page_size: number = 10

  @ApiProperty({ description: '排序字段', example: 'created_at', required: true })
  @IsString()
  order_by: string = 'created_at'

  @ApiProperty({ description: '排序方式', example: 'desc', required: true })
  @IsString()
  order_type: string = 'desc'
}

export class find_info_model_product extends PickType(model_product_dto, ['id']) {}

export class save_model_product extends PickType(model_product_dto, ['title', 'remark', 'price', 'is_public', 'list_img', 'list_file', 'list_video', 'list_extend']) {
  @ApiProperty({ description: 'id(id)', example: 'cuid_string' })
  @IsString({ message: 'id必须为字符串' })
  @IsNotEmpty({ message: 'id不能为空' })
  @IsOptional()
  id: string
}
