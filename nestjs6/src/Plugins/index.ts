import { swagger_Knife4j } from './swagger_Knife4j'
import { static_filestore } from './static_filestore'
import { redis_service } from './redis_config'
import { filter_cors } from './filter_cors'
import { filter_error_sys } from './filter_error_sys'
import { filter_response } from './filter_response'
import { filter_request } from './filter_request'
import { filter_dto } from './filter_dto'
import { check_env } from './check_env'

// 配置:函数
export const Plugins = {
  swagger_Knife4j,
  static_filestore,
  redis_service,
  filter_cors,
  filter_error_sys,
  filter_response,
  filter_request,
  filter_dto,
  check_env,
}
