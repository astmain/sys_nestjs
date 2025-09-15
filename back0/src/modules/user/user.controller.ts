import { /*接口*/  Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, ParseIntPipe, UseInterceptors } from '@nestjs/common'
import { /*文档*/  ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create_user.dto'
import { UpdateUserDto } from './dto/update_user.dto'

import { ApiSuccessResponse, ApiCreatedResponse, ApiPaginatedResponse, ApiBadRequestResponse, ApiUnauthorizedResponse, ApiNotFoundResponse, ApiConflictResponse, ApiInternalServerErrorResponse } from '../../common/decorators/api_response.decorator'
import { UserResponseDto, UserServiceDto, ArticleResponseDto, CommentResponseDto } from '../../common/dto/paginated_response.dto'
import { ProcessTimeFields } from '../../common/decorators/process_time_fields.decorator'
import { TimeFieldsInterceptor } from '../../common/interceptors/time_fields.interceptor'

@ApiTags('用户')
@Controller('user')
@UseInterceptors(TimeFieldsInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ProcessTimeFields()
  @ApiOperation({ summary: '创建用户' })
  @ApiCreatedResponse(UserResponseDto, '用户创建成功')
  @ApiBadRequestResponse()
  @ApiConflictResponse()
  @ApiInternalServerErrorResponse()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }

  @Get()
  @ProcessTimeFields()
  @ApiOperation({ summary: '获取所有用户' })
  @ApiPaginatedResponse(UserResponseDto, '获取用户列表成功')
  @ApiInternalServerErrorResponse()
  find_all() {
    return this.userService.find_all()
  }

  @Get(':id')
  @ProcessTimeFields()
  @ApiOperation({ summary: '根据ID获取用户' })
  @ApiSuccessResponse(UserResponseDto, '获取用户成功')
  @ApiNotFoundResponse()
  @ApiInternalServerErrorResponse()
  async find_one(@Param('id', ParseIntPipe) id: number) {
    return this.userService.find_one(id)
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新用户信息' })
  @ApiSuccessResponse(UserResponseDto, '用户更新成功')
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  @ApiNotFoundResponse()
  @ApiInternalServerErrorResponse()
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除用户' })
  @ApiSuccessResponse(UserResponseDto, '用户删除成功')
  @ApiUnauthorizedResponse()
  @ApiNotFoundResponse()
  @ApiInternalServerErrorResponse()
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id)
  }
}
