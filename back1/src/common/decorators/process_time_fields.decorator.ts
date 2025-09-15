import { SetMetadata } from '@nestjs/common'

export const PROCESS_TIME_FIELDS_KEY = 'processTimeFields'

/**
 * 装饰器：自动处理时间字段
 * 使用此装饰器的方法会自动将返回结果中的时间字段转换为 ISO 字符串格式
 */
export const ProcessTimeFields = () => SetMetadata(PROCESS_TIME_FIELDS_KEY, true)
