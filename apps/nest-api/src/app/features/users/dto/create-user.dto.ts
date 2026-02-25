import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '@common/models/enums/role.enum';
import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  address: string;

  @IsString()
  phone: string;

  @IsString()
  @MinLength(8, { message: 'Maximum number of characters long' })
  password: string;

  @IsString()
  @IsEnum(Role)
  role: string;
}
