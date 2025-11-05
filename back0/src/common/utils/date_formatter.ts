/**
 * 日期时间格式化工具函数
 */

/**
 * 将 Date 对象或 ISO 字符串格式化为 YYYY-MM-DD HH:mm:ss.ms 格式
 * @param date Date 对象或 ISO 字符串
 * @returns 格式化后的时间字符串
 */
export function format_date_time(date: Date | string): string {
  const date_obj = typeof date === 'string' ? new Date(date) : date
  
  if (isNaN(date_obj.getTime())) {
    return date.toString() // 如果日期无效，返回原字符串
  }

  const year = date_obj.getFullYear()
  const month = String(date_obj.getMonth() + 1).padStart(2, '0')
  const day = String(date_obj.getDate()).padStart(2, '0')
  const hours = String(date_obj.getHours()).padStart(2, '0')
  const minutes = String(date_obj.getMinutes()).padStart(2, '0')
  const seconds = String(date_obj.getSeconds()).padStart(2, '0')
  const milliseconds = String(date_obj.getMilliseconds()).padStart(3, '0')

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`
}

/**
 * 递归格式化对象中的所有时间字段
 * @param obj 要格式化的对象
 * @returns 格式化后的对象
 */
export function format_object_dates(obj: any): any {
  if (obj === null || obj === undefined) {
    return obj
  }

  if (obj instanceof Date) {
    return format_date_time(obj)
  }

  if (typeof obj === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(obj)) {
    // 检查是否为 ISO 日期字符串
    return format_date_time(obj)
  }

  if (Array.isArray(obj)) {
    return obj.map(item => format_object_dates(item))
  }

  if (typeof obj === 'object') {
    const formatted_obj: any = {}
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (key === 'created_at' || key === 'updated_at') {
          formatted_obj[key] = format_date_time(obj[key])
        } else {
          formatted_obj[key] = format_object_dates(obj[key])
        }
      }
    }
    return formatted_obj
  }

  return obj
}
