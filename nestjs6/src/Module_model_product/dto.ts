import { ApiProperty, PickType } from '@nestjs/swagger'
import { IsNumber, IsString, IsNotEmpty, IsOptional, IsBoolean, } from 'class-validator'
import { Type } from 'class-transformer'

// 基础dto,方便其他dto集成减少冗余代码(这是基础的dto,其他dto继承自这个dto,这个dto和数据表的字段名一致)
export class model_product_dto {
  @ApiProperty({ description: 'id', example: 'cuid_string' })
  @IsString({ message: 'id必须为字符串' })
  @IsNotEmpty({ message: 'id不能为空' })
  id: string

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
  @IsNotEmpty({ message: 'price不能为空' })
  price: number

  @ApiProperty({ description: 'is_public(是否公开)', example: true })
  @IsBoolean()
  @IsOptional()
  is_public: boolean
}

// create_model_product命名规范和接口的函数名统一一致性,方便阅读
export class create_model_product extends PickType(model_product_dto, ['title', 'remark', 'price', 'is_public']) {}

// update_model_product命名规范和接口的函数名统一一致性,方便阅读
export class update_model_product extends PickType(model_product_dto, ['id', 'title', 'remark', 'price', 'is_public']) {}

// find_list_model_product命名规范和接口的函数名统一一致性,方便阅读
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

// find_info_model_product命名规范和接口的函数名统一一致性,方便阅读
export class find_info_model_product extends PickType(model_product_dto, ['id']) {}
