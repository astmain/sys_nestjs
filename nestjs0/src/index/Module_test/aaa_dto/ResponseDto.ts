// dto/response.dto.ts
import { ApiProperty } from '@nestjs/swagger'
class ResponseDto<T> {
  @ApiProperty({ description: '状态码', example: 200 })
  code: number

  @ApiProperty({ description: '提示信息', example: '请求成功' })
  message: string

  @ApiProperty({ description: '数据', type: Object })
  data: T
}
