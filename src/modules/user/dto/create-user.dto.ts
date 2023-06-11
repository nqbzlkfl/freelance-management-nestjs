import { IsString, IsEmail, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  phone_number: string;

  @IsNotEmpty()
  @IsString()
  skill_set: string;

  @IsNotEmpty()
  @IsString()
  hobby: string;
}
