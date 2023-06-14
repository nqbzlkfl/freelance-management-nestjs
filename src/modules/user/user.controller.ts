import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Get Users
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'Users found',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          email: { type: 'string' },
          username: { type: 'string' },
          phone_number: { type: 'string' },
          skill_set: { type: 'string' },
          hobby: { type: 'string' },
          createdAt: { type: 'string' },
          updatedAt: { type: 'string' },
        },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Users not found' })
  @ApiBadRequestResponse({ description: 'Invalid request' })
  getUsers() {
    return this.userService.getAllUsers();
  }

  // Get User
  @Get(':id')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiResponse({
    status: 200,
    description: 'User found',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        email: { type: 'string' },
        username: { type: 'string' },
        phone_number: { type: 'string' },
        skill_set: { type: 'string' },
        hobby: { type: 'string' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiBadRequestResponse({ description: 'Invalid request parameters' })
  getUser(@Param('id') id: string) {
    return this.userService.getOneUser(+id);
  }

  // Create User
  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'User created' })
  @ApiBadRequestResponse({ description: 'Invalid request body' })
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  // Update User
  @Put(':id')
  @ApiOperation({ summary: 'Update a new user' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 201, description: 'Updated created' })
  @ApiBadRequestResponse({ description: 'Invalid request body' })
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(+id, updateUserDto);
  }

  // Delete User
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a new user' })
  @ApiResponse({ status: 201, description: 'User created' })
  @ApiBadRequestResponse({ description: 'Invalid request body' })
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(+id);
  }
}
