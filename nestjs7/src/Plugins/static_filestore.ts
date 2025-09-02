import { join } from 'path'
import { dirname } from 'path'
import * as fs from 'fs'

export async function static_filestore(app) {
  // // 项目static
  // let path_static = join(process.cwd(), 'static') //绝对路径项目
  // if (!fs.existsSync(path_static)) fs.mkdirSync(path_static, { recursive: true }) // 判断如果没有文件夹,创建文件夹
  // app.useStaticAssets(path_static, { prefix: '/static' })

  // 外部filestore
  // let path_filestore = join(dirname(process.cwd()), `/filestore_oss`) //绝对路径父级
  let path_filestore = join(process.cwd(), `/filestore_oss`) //绝对路径项目
  if (!fs.existsSync(path_filestore)) fs.mkdirSync(path_filestore, { recursive: true }) // 判断如果没有文件夹,创建文件夹
  app.useStaticAssets(path_filestore, {
    prefix: `/filestore_oss`,
    setHeaders: (res) => {
      // 设置响应头，支持中文文件名
      res.setHeader('Content-Disposition', 'inline')
      res.setHeader('Access-Control-Allow-Origin', '*')
    },
  })

  // let path_static_public = join(process.cwd(), 'static_public') //绝对路径项目
  // console.log(`启动---资源目录:`, path_static_public)
  // if (!fs.existsSync(path_static_public)) fs.mkdirSync(path_static_public, { recursive: true }) // 判断如果没有文件夹,创建文件夹
  // app.useStaticAssets(path_static_public, { prefix: '/static_public' })
}
