import { PickType, ApiProperty } from '@nestjs/swagger'
import { IsString, IsOptional } from 'class-validator'

import { tb_model_product } from './tb_model_product'

// 更新的dto
export class save_model_product extends PickType(tb_model_product, [
  // 'id', //id
  // 数据库可以修改的参数
  'title', //标题
  'remark', //备注
  'price_personal', //个人价格
  'price_company', //企业价格
  'price_extend', //扩展价格
  'list_img', //图片列表
  'list_file', //文件列表
  'list_video', //视频列表
  'list_extend', //附件列表
  'list_texture', //贴图列表
  'is_public', //是否公开
  'is_deleted', //是否删除
  'model_format', //模型格式
  'is_business', //是否商用
  'is_skeleton', //是否有骨骼
  'is_animation', //是否有动画
  'is_print', //是否可打印
  'is_no_collapse', //是否未塌陷
  'area_unit', //面片数
  'wiring', //布线

  // 特别字段,关联字段
  'kind_ids', //分类id列表
]) {
  @ApiProperty({ description: 'id(id)', example: 'cuid_string', required: false })
  @IsString({ message: 'id必须为字符串' })
  @IsOptional()
  id?: string
}
