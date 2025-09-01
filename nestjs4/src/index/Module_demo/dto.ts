import { ApiProperty, PickType } from '@nestjs/swagger'
import { IsNumber, IsString, IsNotEmpty } from 'class-validator'


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

  @ApiProperty({ description: 'age', example: 18 })
  @IsNumber()
  @IsNotEmpty({ message: 'age不能为空' })
  age: number
}


// create_demo命名规范和接口的函数名统一一致性,方便阅读
export class create_demo extends PickType(demo_dto, ['name', 'age']) {}


// update_demo命名规范和接口的函数名统一一致性,方便阅读
export class update_demo extends PickType(demo_dto, ['id', 'name', 'age']) {}

// find_demo命名规范和接口的函数名统一一致性,方便阅读
export class find_demo extends PickType(demo_dto, ['name']) {}
