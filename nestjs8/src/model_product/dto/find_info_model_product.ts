import { ApiProperty, OmitType, PickType } from '@nestjs/swagger'
import { IsNumber, IsString, IsNotEmpty, IsOptional, IsBoolean, IsArray, ValidateIf, IsIn, isNumber } from 'class-validator'
import { Type } from 'class-transformer'


import { tb_model_product } from './tb_model_product'

export class find_info_model_product extends PickType(tb_model_product, ['id']) {}
