import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '@api/common/models/enums/role.enum';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Invalid first name' })
  firstName: string;

  @IsString()
  @IsNotEmpty({ message: 'Invalid last name' })
  lastName: string;

  @IsString({ message: 'Invalid password' })
  address: string;

  @IsString()
  phone: string;

  @IsString({ message: 'Invalid password' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;

  @IsString()
  @IsEnum(Role, { message: 'Role must be admin or user' })
  role: string;
}
