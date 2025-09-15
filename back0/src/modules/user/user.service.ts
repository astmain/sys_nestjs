import { Injectable, ConflictException, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { CreateUserDto } from './dto/create_user.dto'
import { UpdateUserDto } from './dto/update_user.dto'
import * as bcrypt from 'bcryptjs'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {}

  async find_all(page: number = 1, limit: number = 10, role?: string, is_active?: boolean) {}

  async find_one(id: number) {}

  async find_by_username(username: string) {}

  async find_by_email(email: string) {}

  async update(id: number, updateUserDto: UpdateUserDto) {}

  async remove(id: number) {
    await this.find_one(id) // 检查用户是否存在
    await this.prisma.tb_user.delete({
      where: { id },
    })
  }

  async validate_password(plainPassword: string, hashedPassword: string) {}
}
