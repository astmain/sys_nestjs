import { PickType } from '@nestjs/swagger'
import { tb_model_kind } from './tb_model_kind'


export class update_model_kind extends PickType(tb_model_kind, ['id', 'name', 'parent_id']) {}