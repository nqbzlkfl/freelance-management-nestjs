import { IsString, IsEmail, IsNumber, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNumber()
  id?: number;

  @IsOptional()
  phone_number?: string;

  @IsOptional()
  @IsString()
  skill_set?: string;

  @IsOptional()
  @IsString()
  hobby?: string;
}
