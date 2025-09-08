import { ApiProperty, OmitType, PickType } from '@nestjs/swagger'
import { IsNumber, IsString, IsNotEmpty, IsOptional, IsBoolean, IsArray, ValidateIf, IsIn, isNumber } from 'class-validator'
import { Type } from 'class-transformer'

// 基础dto
export class tb_model_product {
  @ApiProperty({ description: 'id', example: 'cuid_string' })
  @IsString({ message: 'id必须为字符串' })
  @IsNotEmpty({ message: 'id不能为空' })
  id: string

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
  list_img: any[]

  @ApiProperty({ description: 'list_file(文件列表)', example: [{ url: 'https://www.baidu.com/img/flexible/logo/pc/result.png' }] })
  @IsArray()
  list_file: any[]

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
  @IsNumber({}, { each: true, message: 'kind_ids数组中的每个元素必须是数字' })
  kind_ids?: number[]
}
