import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '@api/common/models/enums/role.enum';
import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

export class UserResponseDto {
  @Expose() id: string;
  @Expose() email: string;
  @Expose() firstName: string;
  @Expose() lastName: string;
  @Expose() address: string;
  @Expose() phone: string;
  @Expose() role: string;

  @Exclude() password: string;
}
