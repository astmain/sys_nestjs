import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"



export class token_parse {
    @ApiProperty({ description: 'token字符', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjE1MTYwMzE1MTEwIiwicGhvbmUiOiIxNTE2MDMxNTExMCIsImlkIjoxLCJ1c2VyX2lkIjoxLCJyb2xlSWRzIjpbXSwiZGVwYXJ0bWVudCI6W3siaWQiOjJ9XSwiaWF0IjoxNzU3MjkwMDc0LCJleHAiOjI2MjEyMDM2NzQsInJvbGVzIjpbXSwiZXh0cmEiOnsiY2hlY2tlZCI6dHJ1ZX0sImlhdF90aW1lIjoiMjAyNS0wOS0wOCAwODowNzo1NCIsImV4cF90aW1lIjoiMjA1My0wMS0yMyAwODowNzo1NCJ9.MQ4jc2ImT4KEhegR4r4DQuG8bbgMj7eRFSVbrVsDrmM' })
    @IsString()
    token: string
  }
  