import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested, IsBoolean, IsObject } from 'class-validator'
import { Type, Transform } from 'class-transformer'

// 单个用户信息的VO类
export class item {
  @ApiProperty({ description: '用户ID', example: 1 })
  @IsNumber()
  id: number

  @ApiProperty({ description: '手机号码', example: '15160315110' })
  @IsString()
  phone: string

  @ApiProperty({ description: '密码', example: '123456' })
  @IsString()
  password: string

  @ApiProperty({ description: '是否删除', example: false })
  @IsBoolean()
  is_delete: boolean
}

// 列表数据的VO类
export class list {
  @ApiProperty({ description: '用户列表', type: [item] })
  @IsArray()
  @Type(() => item)
  @ValidateNested({ each: true })
  list: item[]
}

// 列表查询的响应VO类
export class vo_find_list_test6_demo11 {
  @ApiProperty({ description: '状态码', example: 200 })
  @IsNumber()
  @IsNotEmpty()
  code: number

  @ApiProperty({ description: '响应消息', example: '操作成功' })
  @IsString()
  @IsNotEmpty()
  msg: string

  @ApiProperty({ description: '响应数据' })
  @ValidateNested()
  @Type(() => list)
  result: list
}
