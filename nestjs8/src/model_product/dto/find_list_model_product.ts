import { ApiProperty, OmitType, PickType } from '@nestjs/swagger'
import { IsNumber, IsString, IsNotEmpty, IsOptional, IsBoolean, IsArray, ValidateIf, IsIn, isNumber } from 'class-validator'
import { Type } from 'class-transformer'


export class find_list_model_product {
    @ApiProperty({ description: '页码', example: 1 })
    @IsNumber()
    page_index: number = 1
  
    @ApiProperty({ description: '每页数量', example: 10 })
    @IsNumber()
    page_size: number = 10
  
    // 排序字段
    @ApiProperty({ description: '排序字段', example: 'created_at' })
    @IsString()
    order_by: string = 'created_at'
  
    @ApiProperty({ description: '排序方式', example: 'desc' })
    @IsString()
    order_type: string = 'desc'
  
    // 模糊搜索字段
    @ApiProperty({ description: 'title(标题)', example: '商品标题' })
    @IsString()
    title: string
  
    @ApiProperty({ description: 'remark(备注)', example: '商品备注' })
    @IsString()
    remark: string
  
    @ApiProperty({ description: 'is_check(是否审核)', example: true })
    @IsIn([true, false, null])
    is_check: boolean
  
    // 模糊搜索字段可选参数
    @ApiProperty({ description: 'is_public(是否公开)', example: true })
    @IsIn([true, false, null])
    is_public: boolean
  
    @ApiProperty({ description: 'is_deleted(是否删除)', example: true })
    @IsIn([true, false, null])
    is_deleted: boolean
  
    @ApiProperty({ description: 'is_business(是否商用)', example: true })
    @IsIn([true, false, null])
    is_business: boolean
  
    @ApiProperty({ description: 'is_skeleton(是否有骨骼)', example: true })
    @IsIn([true, false, null])
    is_skeleton: boolean
  
    @ApiProperty({ description: 'is_animation(是否有动画)', example: true })
    @IsIn([true, false, null])
    is_animation: boolean
  
    @ApiProperty({ description: 'is_print(是否可打印)', example: true })
    @IsIn([true, false, null])
    is_print: boolean
  
    @ApiProperty({ description: 'is_no_collapse(未塌陷)', example: true })
    @IsIn([true, false, null])
    is_no_collapse: boolean
  
    @ApiProperty({ description: 'wiring(布线)', example: '三角形' })
    @IsString()
    wiring: string
  
    @ApiProperty({ description: 'area_unit(面片数)', example: '5k以下' })
    @IsString()
    @IsOptional()
    area_unit: string
  
    @ApiProperty({ description: '分类ID列表', example: [1, 2, 3], required: true })
    @IsArray()
    // @IsArrayN
    @IsNumber({}, { each: true, message: 'kind_ids数组中的每个元素必须是数字' })
    kind_ids?: number[]
  }