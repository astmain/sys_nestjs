import { Injectable, NestInterceptor, ExecutionContext, CallHandler, INestApplication } from '@nestjs/common'
import { Observable, map } from 'rxjs'
import { Reflector } from '@nestjs/core'

// 创建排除装饰器
export const SkipResponseFilter = () => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    Reflect.defineMetadata('skip_response_filter', true, descriptor.value)
    return descriptor
  }
}

@Injectable()
export class my_filter_response<T> implements NestInterceptor<T, any> {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> {
    const handle = context.getHandler()

    // 检查是否跳过响应过滤
    const skipFilter = this.reflector.get('skip_response_filter', handle)
    if (skipFilter) {
      return next.handle()
    }

    let summary = this.reflector.get('swagger/apiOperation', handle) || ''
    if (summary) summary = summary.summary

    let res_Observable: Observable<any> = next.handle().pipe(
      map((res_body: any) => {
        // 提示消息判断-优先使用 响应体中的msg ,然来使用接口描述summary, 其次提示兜底
        let msg = ''
        if (res_body.msg) {
          msg = res_body.msg
        } else if (summary) {
          msg = `成功:${summary}`
        } else {
          msg = '成功:但是无接口描述和响应体提示msg'
        }

        // 状态码判断-优先使用 响应体中的code ,然来使用code200兜底
        let code = 200
        if (res_body.code) {
          code = res_body.code
        }

        const res_response = { code, msg, err_msg: '', err_info: {}, ...res_body }
        return res_response
      }),
    )
    return res_Observable
  }
}

export async function filter_response(app: INestApplication) {
  console.log('启用:响应拦截器---filter_response')
  app.useGlobalInterceptors(new my_filter_response(app.get(Reflector)))
}

/*

// import { Observable, map, tap } from 'rxjs' 中的 map 和tap 有什么区别


// map - 转换数据
of(1, 2, 3).pipe(
    map(x => x * 2)
  ).subscribe(console.log)
  // 输出: 2, 4, 6
  
  // tap - 不改变数据，只执行副作用
  of(1, 2, 3).pipe(
    tap(x => console.log('原始值:', x)),
    map(x => x * 2)
  ).subscribe(console.log)
  // 输出: 
  // 原始值: 1
  // 2
  // 原始值: 2
  // 4
  // 原始值: 3
  // 6



  
*/
