// src/dto/user-response.dto.ts
import { ApiProperty } from '@nestjs/swagger'

export class UserResponseDto {
  @ApiProperty({ description: '用户ID', example: 1 })
  id: number

  @ApiProperty({ description: '用户名', example: 'john_doe' })
  username: string

  @ApiProperty({ description: '邮箱', example: 'john@example.com' })
  email: string

  @ApiProperty({ description: '年龄', example: 25, required: false })
  age?: number
}
