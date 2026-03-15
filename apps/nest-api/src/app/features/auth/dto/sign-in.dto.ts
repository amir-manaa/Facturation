import {
  IsEmail,
  IsString,
  MinLength,
} from 'class-validator';

export class SignInDto {
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @IsString({ message: 'Invalid password' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;
}
