import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'

export class find_list_test7_demo1 {
  @ApiProperty({ description: 'ids', example: [1, 2, 3] })
  @IsArray()
  ids!: number[]
}
