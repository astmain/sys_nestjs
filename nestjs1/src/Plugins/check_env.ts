import * as _ from 'lodash'
let rule_env = [
  { name: '项目环境变量路径', value: '', doc: false, key: 'VITE_env_path' },
  { name: '项目名称', value: '', doc: false, key: 'VITE_project_name' },
  { name: '项目备注', value: '', doc: false, key: 'VITE_project_remark' },
  { name: '数据pg链接', value: '', doc_url: '', doc: false, key: 'VITE_url_db_pg' },
  { name: '项目端口号', value: '', doc_url: '', doc: false, key: 'VITE_port' },
  { name: '正在运行', value: '', doc_url: '', doc: true, key: 'VITE_url_app_run' },
  { name: '应用开发', value: '', doc_url: '', doc: true, key: 'VITE_url_app_dev' },
  { name: '应用内网', value: '', doc: true, key: 'VITE_url_app_inner' },
  { name: '应用容器', value: '', doc: true, key: 'VITE_url_app_docker' },
  { name: '应用正式发布', value: '', doc: true, key: 'VITE_url_app_prod' },
  { name: 'jwt密钥', value: '', doc: false, key: 'VITE_jwt_secret' },
  { name: 'jwt过期时间', value: '', doc: false, key: 'VITE_jwt_time_exp' },
  { name: 'jwttoken方便swagger调试', value: '', doc: false, key: 'VITE_jwt_token_swagger' },
]

export function check_env() {
  let env_err_list: any[] = []
  let env_curr = {}
  let env_info_list: any[] = []
  let env_curr_web_description = {}

  let rule_keys = rule_env.map((o) => o.key)

  for (let i = 0; i < rule_keys.length; i++) {
    const key = rule_keys[i]
    const is_exit = process.env.hasOwnProperty(key)
    if (is_exit) {
      const value = process.env[key]
      env_curr[key] = value
      let one = _.find(rule_env, { key })
      env_info_list.push({ ...one, value })
    } else {
      let one = _.find(rule_env, { key })
      env_err_list.push({ ...one, value: '' })
    }
  }

  if (env_err_list.length > 0) {
    const msg_err = `缺少环境变量---请检查项目文件夹[.env]---env_err_list`
    console.log(msg_err, '\n', env_err_list)
    throw new Error(msg_err)
  }

  // 当前环境变量描述
  for (let i = 0; i < env_info_list.length; i++) {
    const one = env_info_list[i]
    if (one.doc) {
      env_curr_web_description[one.name] = {
        ['首页']: one.value,
        ['文档']: one.value + '/doc.html',
      }
    }
  }

  const env_curr_back_description = { 当前数据库: process.env.VITE_url_db_pg, ...env_curr_web_description }

  return {
    env_curr: env_curr,
    env_info_list: env_info_list,
    env_curr_web_description: env_curr_web_description,
    env_curr_back_description: env_curr_back_description,
    env_err_list: env_err_list,
  }
}
