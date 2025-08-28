/**
 * @description 检查环境变量是否正确
 * @param 无
 * @returns {env_curr:当前环境变量,env_curr_description:当前环境变量描述}
 */
export function check_env() {
  // 进程中的全部环境变量
  const env = process.env
  //   console.log('check_env---检查环境变量是否正确', env)

  // 检查环境变量是否存在,如果不存在,则抛出错误
  if (!env.PROJECT_name) throw new Error('PROJECT_name 环境变量不存在')
  if (!env.PROJECT_remark) throw new Error('PROJECT_remark 环境变量不存在')
  if (!env.ENV_path) throw new Error('ENV_path 环境变量不存在')
  if (!env.PORT) throw new Error('PORT 环境变量不存在')
  if (!env.URL_app) throw new Error('URL_app 环境变量不存在')
  if (!env.URL_ip) throw new Error('URL_ip 环境变量不存在')
  if (!env.URL_domain) throw new Error('URL_domain 环境变量不存在')
  if (!env.URL_db) throw new Error('URL_db 环境变量不存在')
  if (!env.JWT_secret) throw new Error('JWT_secret 环境变量不存在')
  if (!env.JWT_time_exp) throw new Error('JWT_time_exp 环境变量不存在')
  if (!env.JWT_token_swagger) throw new Error('JWT_token_swagger 环境变量不存在')

  // 当前环境变量
  const env_curr = {
    PROJECT_name: env.PROJECT_name,
    ENV_path: env.ENV_path,
    PORT: env.PORT,
    URL_app: env.URL_app,
    URL_ip: env.URL_ip,
    URL_domain: env.URL_domain,
    URL_db: env.URL_db,
    JWT_secret: env.JWT_secret,
    JWT_time_exp: env.JWT_time_exp,
    JWT_token_swagger: env.JWT_token_swagger,
  }

  //   const env_curr_description = [
  //     { name: '环境文件路径', key: 'ENV_path', value: env.ENV_path },
  //     { name: '端口号', key: 'PORT', value: env.PORT },
  //     { name: 'url本地', key: 'URL_app', value: env.URL_app },
  //     { name: 'url域名', key: 'URL_ip', value: env.URL_ip },
  //     { name: 'url域名', key: 'URL_domain', value: env.URL_domain },
  //     { name: 'url数据库', key: 'URL_db', value: env.URL_db },
  //     { name: 'JWT密钥', key: 'JWT_secret', value: env.JWT_secret },
  //     { name: 'JWT过期时间', key: 'JWT_time_exp', value: env.JWT_time_exp },
  //     { name: 'JWT方便swagger文档调试使用', key: 'JWT_token_swagger', value: env.JWT_token_swagger },
  //   ]

  // 当前环境变量描述
  const env_curr_description = {
    项目介绍: {
      项目名称: env.PROJECT_name,
      项目备注: env.PROJECT_remark,
    },
    本地: {
      首页: process.env.URL_app,
      文档: process.env.URL_app + '/doc.html',
    },
    内网: {
      首页: process.env.URL_ip,
      文档: process.env.URL_ip + '/doc.html',
    },
    外网: {
      首页: process.env.URL_domain,
      文档: process.env.URL_domain + '/doc.html',
    },
  }

  return { env_curr, env_curr_description }
}
