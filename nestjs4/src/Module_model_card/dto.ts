import { ApiProperty, PickType, PartialType, OmitType } from '@nestjs/swagger'
import { IsNumber, IsString, IsNotEmpty, IsOptional, IsIn, IsBoolean, IsArray } from 'class-validator'

// 基础dto,方便其他dto集成减少冗余代码
export class model_card_dto {
  @ApiProperty({ description: 'id', example: 1 })
  @IsNumber()
  @IsNotEmpty({ message: 'id不能为空' })
  id: number

  @ApiProperty({ description: '用户id', example: 'user123' })
  @IsString({ message: 'user_id必须为字符串' })
  @IsNotEmpty({ message: 'user_id不能为空' })
  user_id: string

  @ApiProperty({ description: '模型id', example: 'model123' })
  @IsString({ message: 'model_id必须为字符串' })
  @IsNotEmpty({ message: 'model_id不能为空' })
  model_id: string

  @ApiProperty({ description: '模型标题', example: '3D模型标题' })
  @IsString({ message: 'model_title必须为字符串' })
  @IsNotEmpty({ message: 'model_title不能为空' })
  model_title: string

  @ApiProperty({ description: '模型价格', example: 100 })
  @IsNumber()
  @IsNotEmpty({ message: 'model_price不能为空' })
  model_price: number

  @ApiProperty({ description: '模型格式', example: '.stl' })
  @IsString({ message: 'model_format必须为字符串' })
  @IsNotEmpty({ message: 'model_format不能为空' })
  model_format: string

  @ApiProperty({ description: '是否删除', example: false })
  @IsBoolean()
  @IsOptional()
  is_deleted: boolean
}

// create_model_card命名规范和接口的函数名统一一致性,方便阅读
export class create_model_card extends PickType(model_card_dto, ['user_id', 'model_id', 'model_title', 'model_price', 'model_format']) {}

// update_model_card命名规范和接口的函数名统一一致性,方便阅读
export class update_model_card extends PickType(model_card_dto, ['id', 'user_id', 'model_id', 'model_title', 'model_price', 'model_format']) {}

// find_list_model_card命名规范和接口的函数名统一一致性,方便阅读
export class find_list_model_card extends PickType(model_card_dto, ['user_id']) {
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

// find_info_model_card命名规范和接口的函数名统一一致性,方便阅读
export class find_info_model_card extends PickType(model_card_dto, ['id']) {}
