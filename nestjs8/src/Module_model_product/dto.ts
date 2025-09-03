import { ApiProperty, OmitType, PickType } from '@nestjs/swagger'
import { IsNumber, IsString, IsNotEmpty, IsOptional, IsBoolean, IsArray } from 'class-validator'
import { Type } from 'class-transformer'

// 基础dto
export class tb_model_product {
  @ApiProperty({ description: 'id', example: 'cuid_string' })
  @IsString({ message: 'id必须为字符串' })
  @IsNotEmpty({ message: 'id不能为空' })
  id: string

  // @ApiProperty({ description: 'user_id(用户id)', example: 1 })
  // @IsNumber()
  // @IsNotEmpty({ message: 'user_id不能为空' })
  // user_id: number

  @ApiProperty({ description: 'title(标题)', example: '商品标题' })
  @IsString({ message: 'title必须为字符串' })
  title: string

  @ApiProperty({ description: 'remark(备注)', example: '商品备注' })
  @IsString({ message: 'remark必须为字符串' })
  remark: string

  @ApiProperty({ description: 'price_personal(个人价格)', example: 100 })
  @IsNumber()
  @Type(() => Number) // 转换为数字
  price_personal: number 

  @ApiProperty({ description: 'price_company(企业价格)', example: 200 })
  @IsNumber()
  @Type(() => Number) // 转换为数字
  price_company: number 

  @ApiProperty({ description: 'price_extend(企业扩展价格)', example: 300 })
  @IsNumber()
  @Type(() => Number) // 转换为数字
  price_extend: number 

  @ApiProperty({ description: 'is_public(是否公开)', example: true })
  @IsBoolean()
  @Type(() => Boolean)
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
  @Type(() => Boolean)
  is_check: boolean 

  @ApiProperty({ description: 'is_check_remark(审核备注)', example: '审核通过' })
  @IsString()
  is_check_remark: string = ''

  @ApiProperty({ description: 'is_business(是否商用)', example: true })
  @IsBoolean()
  @Type(() => Boolean)
  is_business: boolean 

  @ApiProperty({ description: 'is_skeleton(是否有骨骼)', example: true })
  @IsBoolean()
  @Type(() => Boolean)
  is_skeleton: boolean 

  @ApiProperty({ description: 'is_animation(是否有动画)', example: true })
  @IsBoolean()
  @Type(() => Boolean)
  is_animation: boolean 

  @ApiProperty({ description: 'is_print(是否可打印)', example: true })
  @IsBoolean()
  @Type(() => Boolean)
  is_print: boolean 

  @ApiProperty({ description: 'is_deleted(是否删除)', example: true })
  @IsBoolean()
  @Type(() => Boolean)
  is_deleted: boolean 

  @ApiProperty({ description: 'is_no_collapse(未塌陷)', example: true })
  @IsBoolean()
  @Type(() => Boolean)
  is_no_collapse: boolean 

  @ApiProperty({ description: 'model_format(模型格式)', example: '.stl' })
  @IsString()
  model_format: string 

  @ApiProperty({ description: 'area_unit(面片数)', example: '5k以下' })
  @IsString()
  area_unit: string

  @ApiProperty({ description: 'wiring(布线)', example: '三角形' })
  @IsString()
  wiring: string 

  @ApiProperty({ description: 'count_collect(收藏数)', example: 0 })
  @IsNumber()
  @Type(() => Number)
  count_collect: number

  @ApiProperty({ description: 'count_download(下载数)', example: 0 })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  count_download: number

  @ApiProperty({ description: 'count_like(点赞数)', example: 0 })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  count_like: number

  @ApiProperty({ description: '分类ID列表', example: [1, 2, 3], required: false })
  @IsArray()
  @IsOptional()
  kind_ids?: number[]
}

// 搜索list的dto  is_deleted is_check is_business is_skeleton is_animation is_print is_no_collapse  wiring
// export class find_list_model_product extends OmitType(tb_model_product, ['id']) {
export class find_list_model_product  {
  @ApiProperty({ description: '页码', example: 1 })
  @IsNumber()
  page_index: number = 1

  @ApiProperty({ description: '每页数量', example: 10 })
  @IsNumber()
  page_size: number = 10

  @ApiProperty({ description: '排序字段', example: 'created_at' })
  @IsString()
  order_by: string = 'created_at'

  @ApiProperty({ description: '排序方式', example: 'desc' })
  @IsString()
  order_type: string = 'desc'



  // 模糊字段搜索
  // where.is_public = body.is_public
  // where.is_deleted = body.is_deleted
  // where.is_check = body.is_check
  // where.is_business = body.is_business
  // where.is_skeleton = body.is_skeleton
  // where.is_animation = body.is_animation
  // where.is_print = body.is_print
  // where.is_no_collapse = body.is_no_collapse


  @ApiProperty({ description: 'title(标题)', example: '商品标题' })
  @IsString()
  @IsOptional()
  title: string

  @ApiProperty({ description: 'remark(备注)', example: '商品备注' })
  @IsString()
  @IsOptional()
  remark: string


  @ApiProperty({ description: 'is_public(是否公开)', example: true })
  @IsBoolean()
  @IsOptional()
  is_public: boolean

  @ApiProperty({ description: 'is_deleted(是否删除)', example: true })
  @IsBoolean()
  @IsOptional()
  is_deleted: boolean

  @ApiProperty({ description: 'is_check(是否审核)', example: true })
  @IsBoolean()
  @IsOptional()
  is_check: boolean

  @ApiProperty({ description: 'is_business(是否商用)', example: true })
  @IsBoolean()
  @IsOptional()
  is_business: boolean

  @ApiProperty({ description: 'is_skeleton(是否有骨骼)', example: true })
  @IsBoolean()
  @IsOptional()
  is_skeleton: boolean

  @ApiProperty({ description: 'is_animation(是否有动画)', example: true })
  @IsBoolean()
  @IsOptional()
  is_animation: boolean

  @ApiProperty({ description: 'is_print(是否可打印)', example: true })
  @IsBoolean()
  @IsOptional()
  is_print: boolean

  @ApiProperty({ description: 'is_no_collapse(未塌陷)', example: true })
  @IsBoolean()
  @IsOptional()
  is_no_collapse: boolean

  @ApiProperty({ description: 'wiring(布线)', example: '三角形' })
  @IsString()
  @IsOptional()
  wiring: string

  @ApiProperty({ description: 'area_unit(面片数)', example: '5k以下' })
  @IsString()
  @IsOptional()
  area_unit: string

  @ApiProperty({ description: '分类ID列表', example: [1, 2, 3], required: false })
  @IsArray()
  @IsOptional()
  kind_ids?: number[]

}

// 搜索info的dto
export class find_info_model_product extends PickType(tb_model_product, ['id']) {}

// 保存的dto
export class save_model_product extends OmitType(tb_model_product, ['id']) {
  @ApiProperty({ description: 'id(id)', example: 'cuid_string', required: false })
  @IsString({ message: 'id必须为字符串' })
  @IsOptional()
  id?: string
}
