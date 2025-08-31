import * as dayjs from 'dayjs'
import * as _ from 'lodash'
import {
  ApiOperation as _ApiOperation,
  ApiTags as _ApiTags,
  ApiBody as _ApiBody,
  ApiConsumes as _ApiConsumes,
  ApiParam as _ApiParam,
  ApiQuery as _ApiQuery,
  ApiProperty as _ApiProperty,
  ApiOkResponse as _ApiOkResponse,
  ApiBadRequestResponse as _ApiBadRequestResponse,
  ApiExtraModels as _ApiExtraModels,
} from '@nestjs/swagger'
import {
  applyDecorators,
  Controller as _Controller,
  Get as _Get, //请求相关的参数
  Post as _Post,
  Res as _Res,
  Req as _Req,
  Body as _Body,
  Param as _Param,
  Injectable as _Injectable,
  Inject,
  Module as _Module,
} from '@nestjs/common'
import { redis_service } from './redis_config'
import * as fs from 'fs'
import * as path from 'path'
import * as db_prisma from './db_prisma'
import { PrismaClient } from '@prisma/client'
import { JwtService } from '@nestjs/jwt'

@_Injectable()
export class AppController {
  public dayjs = dayjs
  public _ = _
  public fs = fs
  public path = path
  public redis_set = redis_service.redis_set
  public redis_get = redis_service.redis_get
  public my_jwt = new JwtService()
  constructor(
    // @Inject(db_prisma.service) public db: db_prisma.service, //prisma
    @Inject('my_prisma') public db: PrismaClient, //注入全局数据库
  ) {}
}

export const ApiTags = _ApiTags
export const ApiParam = _ApiParam
export const ApiQuery = _ApiQuery
export const Controller = _Controller
export const Get = _Get
export const Post = _Post
export const Body = _Body
export const Req = _Req
export const ApiOperation = _ApiOperation
export const ApiBody = _ApiBody
export const Res = _Res
export const Param = _Param
export const ApiConsumes = _ApiConsumes
export const Module = _Module
export const ApiProperty = _ApiProperty
export const ApiOkResponse = _ApiOkResponse
export const ApiBadRequestResponse = _ApiBadRequestResponse
export const ApiExtraModels = _ApiExtraModels

export function ApiPost(path?: string, summary?: string, description?: string) {
  return applyDecorators(Post(path), ApiOperation({ summary, description }))
}
