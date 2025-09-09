import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class test_return {
    @ApiProperty({ description: 'name字段', example: '15160315110' })
    @IsString()
    name: string


}