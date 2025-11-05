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

// 动态VO工厂函数 - 支持任意key名称
export function VO<T>(dataType: new () => T, keyName: string = 'data') {
  // 创建唯一的类名，避免Swagger类型冲突
  const uniqueId = Math.random().toString(36).substr(2, 9)
  const wrapperClassName = `Wrapper_${keyName}_${uniqueId}`
  const responseClassName = `Response_${keyName}_${uniqueId}`

  // 动态创建包装类
  class WrapperClass {
    @ApiProperty({
      description: '数据对象',
      type: dataType,
    })
    [keyName]: T
  }

  // 设置类名
  Object.defineProperty(WrapperClass, 'name', { value: wrapperClassName })

  // 动态创建响应类
  class ResponseClass extends Base_Response_Dto<WrapperClass> {
    @ApiProperty({ description: '状态码', example: 200 })
    code: number

    @ApiProperty({ description: '响应消息', example: '操作成功' })
    msg: string

    @ApiProperty({
      description: '响应数据',
      type: WrapperClass,
    })
    result: WrapperClass
  }

  // 设置类名
  Object.defineProperty(ResponseClass, 'name', { value: responseClassName })

  return ResponseClass
}

// // 便捷函数 - 为常用key创建快捷方式
// export const VO_Data = <T>(dataType: new () => T) => VO(dataType, 'data')
// export const VO_One2 = <T>(dataType: new () => T) => VO(dataType, 'one2')
// export const VO_User = <T>(dataType: new () => T) => VO(dataType, 'user')
// export const VO_List = <T>(dataType: new () => T) => VO(dataType, 'list')
