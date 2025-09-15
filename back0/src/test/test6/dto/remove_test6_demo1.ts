import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsNotEmpty, IsNumber } from 'class-validator'

export class remove_test6_demo1 {
  @ApiProperty({ description: 'ids', example: [1, 2, 3] })
  @IsArray()
//   @IsNotEmpty()
//   @IsNumber({}, { each: true })
  ids: number[]
}


