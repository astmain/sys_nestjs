import { Request, Response, NextFunction } from 'express'
import { Color } from '@src/Plugins/Color'

import { INestApplication } from '@nestjs/common'
import * as express from 'express' // [新代码ai生产] 导入express
// 全局中间件函数
export async function filter_request(app: INestApplication) {
  console.log(`启用:请求拦截器---filter_request`)
  //配置body解析器，用于解析POST请求的JSON数据
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(my_global_request_middle_ware)
}

function my_global_request_middle_ware(req: Request, res: Response, next: NextFunction) {
  // 获取完整 URL（路径 + 查询参数）
  const fullUrl = req.originalUrl

  const path = req.path // 获取路径（不包含查询参数）
  const method = req.method // 获取请求方法
  const queryParams = req.query // 获取查询参数（解析后的对象）
  const routeParams = req.params // 获取路由参数（例如 /users/:id 中的 id）
  const body = req.body // 获取请求体（如果有）

  console.log(Color.purple + `-----------------------------------------------------------`)
  console.log(Color.gray + `filter_request`)
  console.log(`  fullUrl: ${fullUrl}`)
  console.log(`  method: ${method}`)
  // console.log(`  Path: ${path}`)
  // console.log(`  Query Params:`, queryParams)
  // console.log(`  Route Params:`, routeParams)
  // console.log(`  Body:`, body)
  console.log(Color.reset)

  // 我是有参数的,但是为什么输出结果没有,下面是输出结果:
  // - fullUrl: /all_test/index
  // - Path: /all_test/index
  // - Query Params: {}
  // - Route Params: {}
  // - Body: undefined

  next() // 传递请求到下一个中间件或路由处理程序
}
