import { ApiProperty, PickType } from '@nestjs/swagger'
import { IsNumber, IsString, IsNotEmpty, IsOptional, IsArray } from 'class-validator'

// 基础dto,方便其他dto集成减少冗余代码
export class demo_dto {
  @ApiProperty({ description: 'id', example: 1 })
  @IsNumber()
  @IsNotEmpty({ message: 'id不能为空' })
  id: number

  @ApiProperty({ description: 'name', example: 'test' })
  @IsString({ message: 'name必须为字符串' })
  @IsNotEmpty({ message: 'name不能为空' })
  name: string

  @ApiProperty({ description: 'remark', example: 'test' })
  @IsString({ message: 'remark必须为字符串' })
  @IsNotEmpty({ message: 'remark不能为空' })
  remark: string

  @ApiProperty({ description: 'price_personal(个人授权价)', example: 0 })
  @IsNumber()
  @IsNotEmpty({ message: 'price_personal不能为空' })
  price_personal: number

  @ApiProperty({ description: 'price_company(企业授权价)', example: 0 })
  @IsNumber()
  @IsNotEmpty({ message: 'price_company不能为空' })
  price_company: number

  @ApiProperty({ description: 'price_extend(企业扩展授权价)', example: 0 })
  @IsNumber()
  @IsOptional()
  price_extend: number

  @ApiProperty({ description: 'list_img(图片列表)', example: [{ img: 'https://www.baidu.com/img/flexible/logo/pc/result.png' }] })
  @IsOptional()
  @IsArray()
  list_img: any[]
}

// create_demo命名规范和接口的函数名统一一致性,方便阅读
export class create_demo extends PickType(demo_dto, ['name', 'remark', 'price_personal', 'price_company', 'price_extend']) {}

// update_demo命名规范和接口的函数名统一一致性,方便阅读
export class update_demo extends PickType(demo_dto, ['id', 'name', 'remark', 'price_personal', 'price_company', 'price_extend']) {}

// find_list_demo命名规范和接口的函数名统一一致性,方便阅读
export class find_list_demo extends PickType(demo_dto, ['name']) {
  @ApiProperty({ description: '页码', example: 1, required: true })
  @IsNumber()
  page_index: number = 1

  @ApiProperty({ description: '每页数量', example: 10, required: true })
  @IsNumber()
  page_size: number = 10

  @ApiProperty({ description: '排序字段', example: 'id', required: true })
  @IsString()
  order_by: string = 'id'

  @ApiProperty({ description: '排序方式', example: 'desc', required: true })
  @IsString()
  order_type: string = 'desc'
}

// find_info_demo命名规范和接口的函数名统一一致性,方便阅读
export class find_info_demo extends PickType(demo_dto, ['id']) {}
