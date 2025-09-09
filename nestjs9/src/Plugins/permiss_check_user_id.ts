import { UnauthorizedException } from '@nestjs/common'

// 检查用户id是否一致
export const permiss_check_user_id = ({ user_id, req_user_id, req_url = '' }: { user_id: number; req_user_id: number; req_url: string }) => {
  console.log('permiss_check_user_id---等待开发')

  // if (user_id !== token_user_id) {
  //   throw new UnauthorizedException()
  // }
}
