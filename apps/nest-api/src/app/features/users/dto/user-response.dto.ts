import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from '@common/models/enums/user-role.enum';
import { IsEmail, IsString, MinLength } from 'class-validator';


export class UserResponseDto {
  @IsString()
  id: string;

  @IsEmail()
  @MinLength(8)
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
  password: string;

  @IsString()
  role: string;
}
