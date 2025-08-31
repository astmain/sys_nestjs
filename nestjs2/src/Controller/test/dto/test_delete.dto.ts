import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty, IsNumberString } from 'class-validator'

export class TestDeleteDto {
  @ApiProperty({
    description: '要删除的记录ID',
    example: '1',
    type: String
  })
  @IsString()
  @IsNotEmpty({ message: 'ID不能为空' })
  @IsNumberString({}, { message: 'ID必须是数字字符串' })
  id: string
} 