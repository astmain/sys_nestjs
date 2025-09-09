// src/dto/page.dto.ts
import { ApiProperty } from '@nestjs/swagger'

export class PageVo<T> {
  @ApiProperty({ description: '当前页', example: 1 })
  pageNum: number

  @ApiProperty({ description: '每页数量', example: 10 })
  pageSize: number

  @ApiProperty({ description: '总数', example: 100 })
  total: number

  @ApiProperty({ description: '数据列表', type: [Object] })
  list: T[]
}
