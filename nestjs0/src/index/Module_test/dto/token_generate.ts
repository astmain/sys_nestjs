import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsNumber, IsArray } from "class-validator"

export class test_token_generate_dto {
    @ApiProperty({ description: 'username字符', example: '15160315110' })
    @IsString()
    username: string
  
    @ApiProperty({ description: 'phone字符', example: '15160315110' })
    @IsString()
    phone: string
  
    @ApiProperty({ description: 'id字符', example: 1 })
    @IsNumber()
    id: number
  
    @ApiProperty({ description: 'roleIds字符', example: [] })
    @IsArray()
    roleIds: number[]



    @ApiProperty({ description: 'department字符', example: [] })
    @IsArray()
    department: any[]
  
    @ApiProperty({ description: 'iat_time字符', example: '2025-09-02 19:47:02' })
    @IsString()
    iat_time: string
  
    @ApiProperty({ description: 'exp_time字符', example: '2053-01-17 19:47:02' })
    @IsString()
    exp_time: string
  }
  