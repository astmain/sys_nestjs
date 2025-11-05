import { applyDecorators, Type } from '@nestjs/common'
import { ApiResponse, ApiResponseOptions } from '@nestjs/swagger'

// 基础响应接口
export interface BaseResponse<T = any> {
  success: boolean
  data: T
  message: string
  timestamp: string
}

// 分页响应接口
export interface PaginatedResponse<T = any> {
  success: boolean
  data: {
    items: T[]
    total: number
    page: number
    limit: number
    total_pages: number
  }
  message: string
  timestamp: string
}

// 错误响应接口
export interface ErrorResponse {
  statusCode: number
  timestamp: string
  path: string
  method: string
  message: string | string[]
  error?: string
}

// 成功响应装饰器
export function ApiSuccessResponse<T>(
  type: Type<T>,
  description: string = '操作成功',
  options?: Omit<ApiResponseOptions, 'type' | 'description'>
) {
  return applyDecorators(
    ApiResponse({
      status: 200,
      description,
      type: type,
      ...options,
    })
  )
}

// 创建成功响应装饰器
export function ApiCreatedResponse<T>(
  type: Type<T>,
  description: string = '创建成功',
  options?: Omit<ApiResponseOptions, 'type' | 'description'>
) {
  return applyDecorators(
    ApiResponse({
      status: 201,
      description,
      type: type,
      ...options,
    })
  )
}

// 分页响应装饰器
export function ApiPaginatedResponse<T>(
  type: Type<T>,
  description: string = '获取列表成功'
) {
  return applyDecorators(
    ApiResponse({
      status: 200,
      description,
      schema: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          data: {
            type: 'object',
            properties: {
              items: {
                type: 'array',
                items: { $ref: `#/components/schemas/${type.name}` }
              },
              total: { type: 'number', example: 100 },
              page: { type: 'number', example: 1 },
              limit: { type: 'number', example: 10 },
              total_pages: { type: 'number', example: 10 }
            }
          },
          message: { type: 'string', example: '获取列表成功' },
          timestamp: { type: 'string', example: '2024-01-01T00:00:00.000Z' }
        }
      }
    })
  )
}

// 错误响应装饰器
export function ApiErrorResponse(
  status: number,
  description: string,
  example?: any
) {
  return applyDecorators(
    ApiResponse({
      status,
      description,
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: status },
          timestamp: { type: 'string', example: '2024-01-01T00:00:00.000Z' },
          path: { type: 'string', example: '/api/users' },
          method: { type: 'string', example: 'GET' },
          message: { 
            oneOf: [
              { type: 'string', example: '错误信息' },
              { type: 'array', items: { type: 'string' }, example: ['错误信息1', '错误信息2'] }
            ]
          },
          error: { type: 'string', example: 'Bad Request' }
        }
      }
    })
  )
}

// 常用错误响应
export const ApiBadRequestResponse = () => ApiErrorResponse(400, '请求参数错误')
export const ApiUnauthorizedResponse = () => ApiErrorResponse(401, '未授权')
export const ApiForbiddenResponse = () => ApiErrorResponse(403, '禁止访问')
export const ApiNotFoundResponse = () => ApiErrorResponse(404, '资源不存在')
export const ApiConflictResponse = () => ApiErrorResponse(409, '资源冲突')
export const ApiInternalServerErrorResponse = () => ApiErrorResponse(500, '服务器内部错误')

// 认证相关响应
export const ApiLoginSuccessResponse = () => applyDecorators(
  ApiResponse({
    status: 200,
    description: '登录成功',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        data: {
          type: 'object',
          properties: {
            user: {
              type: 'object',
              properties: {
                id: { type: 'number', example: 1 },
                username: { type: 'string', example: 'john_doe' },
                email: { type: 'string', example: 'john@example.com' },
                role: { type: 'string', example: 'user' },
                created_at: { type: 'string', example: '2024-01-01T00:00:00.000Z' }
              }
            },
            access_token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' }
          }
        },
        message: { type: 'string', example: '登录成功' },
        timestamp: { type: 'string', example: '2024-01-01T00:00:00.000Z' }
      }
    }
  })
)

export const ApiRegisterSuccessResponse = () => applyDecorators(
  ApiResponse({
    status: 201,
    description: '注册成功',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        data: {
          type: 'object',
          properties: {
            user: {
              type: 'object',
              properties: {
                id: { type: 'number', example: 1 },
                username: { type: 'string', example: 'john_doe' },
                email: { type: 'string', example: 'john@example.com' },
                role: { type: 'string', example: 'user' },
                created_at: { type: 'string', example: '2024-01-01T00:00:00.000Z' }
              }
            }
          }
        },
        message: { type: 'string', example: '注册成功' },
        timestamp: { type: 'string', example: '2024-01-01T00:00:00.000Z' }
      }
    }
  })
)
