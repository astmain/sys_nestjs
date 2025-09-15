import { ApiProperty } from '@nestjs/swagger'

// 通用响应DTO - 包含code和msg
class Base_Response_Dto<T = any> {
  @ApiProperty({ description: '状态码', example: 200 })
  code: number

  @ApiProperty({ description: '响应消息', example: '操作成功' })
  msg: string

  @ApiProperty({ description: '响应数据' })
  result: T

  constructor(code: number = 200, msg: string = '操作成功', result: T = null as T) {
    this.code = code
    this.msg = msg
    this.result = result
  }
}

// 为 one2 key 创建专门的工厂函数
export function VO_One2<T>(dataType: new () => T) {
  class One2WrapperDto {
    @ApiProperty({
      description: '数据对象',
      type: dataType,
    })
    one2: T
  }

  class One2ResponseDto extends Base_Response_Dto<One2WrapperDto> {
    @ApiProperty({ description: '状态码', example: 200 })
    code: number

    @ApiProperty({ description: '响应消息', example: '操作成功' })
    msg: string

    @ApiProperty({
      description: '响应数据',
      type: One2WrapperDto,
    })
    result: One2WrapperDto
  }

  return One2ResponseDto
}
