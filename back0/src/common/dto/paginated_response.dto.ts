import { ApiProperty } from '@nestjs/swagger'

export class PaginatedMetaDto {
  @ApiProperty({ description: '总数量', example: 100 })
  total: number

  @ApiProperty({ description: '当前页码', example: 1 })
  page: number

  @ApiProperty({ description: '每页数量', example: 10 })
  limit: number

  @ApiProperty({ description: '总页数', example: 10 })
  total_pages: number
}

export class PaginatedDataDto<T> {
  @ApiProperty({ description: '数据列表', type: 'array' })
  items: T[]

  @ApiProperty({ description: '分页信息', type: PaginatedMetaDto })
  meta: PaginatedMetaDto
}

export class PaginatedResponseDto<T> {
  @ApiProperty({ description: '是否成功', example: true })
  success: boolean

  @ApiProperty({ description: '响应数据', type: PaginatedDataDto })
  data: PaginatedDataDto<T>

  @ApiProperty({ description: '响应消息', example: '获取列表成功' })
  message: string

  @ApiProperty({ description: '响应时间戳', example: '2024-01-01 00:00:00.000' })
  timestamp: string
}

// 用户相关响应示例
export class UserResponseDto {
  @ApiProperty({ description: '用户ID', example: 1 })
  id: number

  @ApiProperty({ description: '用户名', example: 'john_doe' })
  username: string

  @ApiProperty({ description: '邮箱', example: 'john@example.com' })
  email: string

  @ApiProperty({ description: '角色', example: 'user' })
  role: string

  @ApiProperty({ description: '头像', example: 'https://example.com/avatar.jpg', required: false })
  avatar?: string

  @ApiProperty({ description: '个人简介', example: '这是一个用户简介', required: false })
  bio?: string

  @ApiProperty({ description: '创建时间', example: '2024-01-01 00:00:00.000' })
  created_at: string

  @ApiProperty({ description: '更新时间', example: '2024-01-01 00:00:00.000' })
  updated_at: string
}

// 用户服务层返回类型（包含 Date 类型）
export class UserServiceDto {
  id: number
  username: string
  email: string
  role: string
  avatar?: string
  bio?: string
  is_active: boolean
  created_at: Date
  updated_at: Date
}

// 文章相关响应示例
export class ArticleResponseDto {
  @ApiProperty({ description: '文章ID', example: 1 })
  id: number

  @ApiProperty({ description: '文章标题', example: '这是一篇文章标题' })
  title: string

  @ApiProperty({ description: '文章别名', example: 'this-is-an-article-title' })
  slug: string

  @ApiProperty({ description: '文章摘要', example: '这是文章摘要' })
  summary: string

  @ApiProperty({ description: '文章内容', example: '这是文章内容...' })
  content: string

  @ApiProperty({ description: '是否发布', example: true })
  is_published: boolean

  @ApiProperty({ description: '浏览量', example: 100 })
  view_count: number

  @ApiProperty({ description: '点赞数', example: 10 })
  like_count: number

  @ApiProperty({ description: '作者信息', type: UserResponseDto })
  author: UserResponseDto

  @ApiProperty({ description: '分类信息', type: 'object', required: false })
  category?: any

  @ApiProperty({ description: '标签列表', type: 'array', items: { type: 'object' }, required: false })
  tags?: any[]

  @ApiProperty({ description: '创建时间', example: '2024-01-01 00:00:00.000' })
  created_at: string

  @ApiProperty({ description: '更新时间', example: '2024-01-01 00:00:00.000' })
  updated_at: string
}

// 分类相关响应示例
export class CategoryResponseDto {
  @ApiProperty({ description: '分类ID', example: 1 })
  id: number

  @ApiProperty({ description: '分类名称', example: '技术' })
  name: string

  @ApiProperty({ description: '分类别名', example: 'technology' })
  slug: string

  @ApiProperty({ description: '分类描述', example: '技术相关文章分类', required: false })
  description?: string

  @ApiProperty({ description: '文章数量', example: 10 })
  article_count: number

  @ApiProperty({ description: '创建时间', example: '2024-01-01 00:00:00.000' })
  created_at: string

  @ApiProperty({ description: '更新时间', example: '2024-01-01 00:00:00.000' })
  updated_at: string
}

// 标签相关响应示例
export class TagResponseDto {
  @ApiProperty({ description: '标签ID', example: 1 })
  id: number

  @ApiProperty({ description: '标签名称', example: 'JavaScript' })
  name: string

  @ApiProperty({ description: '标签别名', example: 'javascript' })
  slug: string

  @ApiProperty({ description: '标签颜色', example: '#3498db', required: false })
  color?: string

  @ApiProperty({ description: '文章数量', example: 5 })
  article_count: number

  @ApiProperty({ description: '创建时间', example: '2024-01-01 00:00:00.000' })
  created_at: string

  @ApiProperty({ description: '更新时间', example: '2024-01-01 00:00:00.000' })
  updated_at: string
}

// 评论相关响应示例
export class CommentResponseDto {
  @ApiProperty({ description: '评论ID', example: 1 })
  id: number

  @ApiProperty({ description: '评论内容', example: '这是一条评论' })
  content: string

  @ApiProperty({ description: '点赞数', example: 3 })
  like_count: number

  @ApiProperty({ description: '父评论ID', example: null, required: false })
  parent_id?: number

  @ApiProperty({ description: '评论者信息', type: UserResponseDto })
  author: UserResponseDto

  @ApiProperty({ description: '文章信息', type: 'object' })
  article: any

  @ApiProperty({ description: '创建时间', example: '2024-01-01 00:00:00.000' })
  created_at: string

  @ApiProperty({ description: '更新时间', example: '2024-01-01 00:00:00.000' })
  updated_at: string
}

// 统计信息响应示例
export class StatisticsResponseDto {
  @ApiProperty({ description: '用户总数', example: 100 })
  total_users: number

  @ApiProperty({ description: '文章总数', example: 500 })
  total_articles: number

  @ApiProperty({ description: '分类总数', example: 10 })
  total_categories: number

  @ApiProperty({ description: '标签总数', example: 50 })
  total_tags: number

  @ApiProperty({ description: '评论总数', example: 1000 })
  total_comments: number

  @ApiProperty({ description: '总浏览量', example: 10000 })
  total_views: number

  @ApiProperty({ description: '总点赞数', example: 500 })
  total_likes: number
}
