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

// 为 data key 创建专门的工厂函数
export function VO_Data<T>(dataType: new () => T) {
  class DataWrapperDto {
    @ApiProperty({
      description: '数据对象',
      type: dataType,
    })
    data: T
  }

  class DataResponseDto extends Base_Response_Dto<DataWrapperDto> {
    @ApiProperty({ description: '状态码', example: 200 })
    code: number

    @ApiProperty({ description: '响应消息', example: '操作成功' })
    msg: string

    @ApiProperty({
      description: '响应数据',
      type: DataWrapperDto,
    })
    result: DataWrapperDto
  }

  return DataResponseDto
}

// 通用工厂函数VO - 支持嵌套对象，可以传入key名称
export function VO<T>(dataType: new () => T, keyName: string = 'data') {
  if (keyName === 'one2') {
    return VO_One2(dataType)
  } else if (keyName === 'data') {
    return VO_Data(dataType)
  } else {
    // 其他情况使用通用方法
    class WrapperDto {
      @ApiProperty({
        description: '数据对象',
        type: dataType,
      })
      [keyName]: T
    }

    class ResponseDto extends Base_Response_Dto<WrapperDto> {
      @ApiProperty({ description: '状态码', example: 200 })
      code: number

      @ApiProperty({ description: '响应消息', example: '操作成功' })
      msg: string

      @ApiProperty({
        description: '响应数据',
        type: WrapperDto,
      })
      result: WrapperDto
    }

    return ResponseDto
  }
}
