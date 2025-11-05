import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator'
import { Type, Transform } from 'class-transformer'

export class ids {
  @ApiProperty({ description: '(vo)ids', example: [1, 2, 3] })
  @IsArray({ message: 'ids must be an array' })
  // @IsNotEmpty({ message: 'ids should not be empty' })
  // @IsNumber({}, { each: true, message: 'each value in ids must be a number' })
  // @Type(() => Number)
  ids!: number[]
}

export class vo_remove_test9_demo1 {
  @ApiProperty({ description: '状态码', example: 200 })
  @IsNumber()
  code!: number

  @ApiProperty({ description: '响应消息', example: '操作成功' })
  @IsString()
  msg!: string

  @ApiProperty({ description: '响应数据', type: ids })
  // @ValidateNested()
  @Type(() => ids)
  result!: ids
}