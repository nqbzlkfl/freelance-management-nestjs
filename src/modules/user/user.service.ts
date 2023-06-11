import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllUsers() {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async getOneUser(id: number) {
    try {
      const existingUser = await this.prisma.user.findUnique({ where: { id } });
      if (!existingUser) {
        throw new NotFoundException();
      }
      const user = await this.prisma.user.findFirst({ where: { id } });
      return user;
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  async createUser(createUserDto: CreateUserDto) {
    try {
      const createdUser = await this.prisma.user.create({
        data: createUserDto,
      });
      return { message: 'Successfully created user!', user: createdUser };
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Email or username already taken');
      }
      throw error;
    }
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    try {
      const existingUser = await this.prisma.user.findUnique({ where: { id } });
      if (!existingUser) {
        throw new NotFoundException();
      }
      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: updateUserDto,
      });
      return { message: 'Successfully updated user' };
    } catch (error) {
      if (error.status === 404) throw new NotFoundException('User not found');
      throw new InternalServerErrorException('Failed to update user');
    }
  }

  async deleteUser(id: number) {
    try {
      const existingUser = await this.prisma.user.findUnique({ where: { id } });
      if (!existingUser) {
        throw new NotFoundException();
      }
      const deletedUser = await this.prisma.user.delete({ where: { id } });
      return { message: 'Successfully deleted user' };
    } catch (error) {
      if (error.status === 404) {
        throw new NotFoundException('User not found or already been deleted');
      }
      throw new InternalServerErrorException('Failed to delete user');
    }
  }
}
