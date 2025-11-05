import { ApiProperty, PickType } from '@nestjs/swagger'
import { IsNumber, IsString, IsNotEmpty } from 'class-validator'

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

export class create_demo extends PickType(demo_dto, ['name', 'age']) {}

export class update_demo extends PickType(demo_dto, ['id', 'name', 'age']) {}

export class find_demo extends PickType(demo_dto, ['name']) {}
