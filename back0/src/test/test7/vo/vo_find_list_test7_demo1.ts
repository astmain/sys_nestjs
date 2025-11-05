import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested, IsBoolean, IsObject, IsDate } from 'class-validator'
import { Type, Transform, Exclude } from 'class-transformer'

// 单个用户信息的VO类 - 使用精确类型
export class item {
  @ApiProperty({ description: '用户ID', example: 1 })
  @IsNumber()
  id!: number

  @ApiProperty({ description: '手机号码', example: '15160315110' })
  @IsString()
  phone!: string

  @ApiProperty({ description: '密码', example: '123456' })
  @IsString()
  password!: string

  @ApiProperty({ description: '是否删除', example: false })
  @IsBoolean()
  is_delete!: boolean

  @Exclude()
  @ApiProperty({ description: '创建时间', example: '2025-09-11T16:57:10.847Z' })
  @IsDate()
  created_at!: Date

  @Exclude()
  @ApiProperty({ description: '更新时间', example: '2025-09-11T16:57:10.847Z' })
  @IsDate()
  updated_at!: Date

  @ApiProperty({ description: '是否检查', example: true })
  @IsBoolean()
  @Exclude()
  is_check!: boolean

  @ApiProperty({ description: '是否激活', example: true })
  @IsBoolean()
  @Exclude()
  is_active!: boolean

  @ApiProperty({ description: '是否公开', example: true })
  @IsBoolean()
  @Exclude()
  is_public!: boolean

  @ApiProperty({ description: '文件格式', example: '.png' })
  @IsString()
  @Exclude()
  type_format!: string

  @ApiProperty({ description: '区域', example: '三角' })
  @IsString()
  @Exclude()
  type_area!: string

  @ApiProperty({ description: '点位', example: '3k以下' })
  @IsString()
  @Exclude()
  type_point!: string

  @ApiProperty({ description: '图片', example: ['.png', '.jpg'] })
  @IsArray()
  @Exclude()
  list_img!: any

  @ApiProperty({ description: '扩展', example: ['.png', '.jpg'] })
  @IsArray()
  @Exclude()
  list_extend!: any

  @ApiProperty({ description: '文件', example: ['.png', '.jpg'] })
  @IsArray()
  @Exclude()
  list_file!: any
}

// 列表数据的VO类
export class list {
  @ApiProperty({ description: '用户列表', type: [item] })
  @IsArray()
  @Type(() => item)
  @ValidateNested({ each: true })
  list!: item[]
}

// 列表查询的响应VO类
export class vo_find_list_test7_demo1 {
  @ApiProperty({ description: '状态码', example: 200 })
  @IsNumber()
  @IsNotEmpty()
  code!: number

  @ApiProperty({ description: '响应消息', example: '操作成功' })
  @IsString()
  @IsNotEmpty()
  msg!: string

  @ApiProperty({ description: '响应数据' })
  @ValidateNested()
  // @Type(() => list)
  result!: list
}
