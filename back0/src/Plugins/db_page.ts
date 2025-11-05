// 博客代码 https://chatgpt.com/share/68c3ea93-6614-800c-a045-954810faca90
import { Prisma } from '@prisma/client'

/** 页码式分页参数 */
export type PagePagination = {
  mode: 'page'
  currentPage: number // 从 1 开始
  pageSize: number // 每页条数
}

/** 游标式分页参数（只实现向前翻页：即“取游标之后的 N 条”） */
export type CursorPagination<T> = {
  mode: 'cursor'
  take: number // 每次取多少
  cursor?: unknown // 上一次返回的 nextCursor；第一次不传
  cursorField?: keyof T | string // 游标字段名，默认 "id"
  getCursor?: (item: T) => unknown // 如果不是简单字段，提供如何从 item 拿游标
}

/** 分页返回的元信息（page 模式会包含 total 等） */
export type PageMeta<T = unknown> = {
  mode: 'page' | 'cursor'
  // 通用
  hasNext: boolean
  hasPrev: boolean
  nextCursor?: unknown // cursor 模式下返回
  prevCursor?: unknown // （简化起见不计算，保留扩展位）
  // 仅 page 模式
  page?: number //当前页码
  pageSize?: number //每页数量
  total?: number //数据总数量
  pageTotal?: number //页码总数
}

/** 返回结构 */
export type PaginatedResult<T = unknown> = {
  list: T[]
  pagination: PageMeta<T>
}

/**
 * 可接受任意 Prisma delegate（如 prisma.user），并保留 where/orderBy/select/include 等能力。
 * A 的类型尽量与 findMany 的参数结构保持一致（宽松定义以获得通用性）。
 */
type FindManyArgs = {
  where?: any
  orderBy?: any
  select?: any
  include?: any
  // 扩展：Prisma 原生分页/游标字段
  skip?: number
  take?: number
  cursor?: any
}

/** 通用 paginate 函数 */
export async function db_page<T, A extends FindManyArgs>(model: { findMany(args: A): Promise<T[]>; count(args?: { where?: any }): Promise<number> }, baseArgs: A, pagination: PagePagination | CursorPagination<T>): Promise<PaginatedResult<T>> {
  if (pagination.mode === 'page') {
    const { currentPage, pageSize } = pagination
    const page = currentPage //hook常量
    const [data, total] = await Promise.all([
      model.findMany({
        ...baseArgs,
        skip: (page - 1) * pageSize,
        take: pageSize,
      } as A),
      model.count({ where: baseArgs?.where }),
    ])

    const totalPages = Math.ceil(total / pageSize)

    return { list: data, pagination: { mode: 'page', page, pageSize, total, pageTotal: totalPages, hasPrev: page > 1, hasNext: page < totalPages } }
  }

  // cursor 模式
  const take = Math.max(1, pagination.take)
  const cursorField = pagination.cursorField ?? ('id' as keyof T | string)

  // 多取一条判断 hasNext
  const pageSizePlusOne = take + 1

  const args: A = {
    ...baseArgs,
    take: pageSizePlusOne,
  } as A

  if (pagination.cursor != null) {
    ;(args as any).cursor = {
      [cursorField as string]: pagination.cursor,
    }
    ;(args as any).skip = 1 // 跳过游标项本身
  }

  const raw = await model.findMany(args)
  const hasNext = raw.length > take
  const data = hasNext ? raw.slice(0, take) : raw

  const getCursor =
    pagination.getCursor ??
    ((item: T) => {
      // 尝试从字段直接取
      const anyItem = item as any
      return anyItem?.[cursorField as string]
    })

  const nextCursor = data.length ? getCursor(data[data.length - 1]) : undefined
  return { list: data, pagination: { mode: 'cursor', hasNext, hasPrev: Boolean(pagination.cursor), nextCursor } }
}
