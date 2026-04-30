import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsPhoneNumber,
  IsEnum,
  ValidateIf,
  IsOptional
} from 'class-validator';
import { Transform } from 'class-transformer';
import { CustomerTypeEnum } from '../models/enums/customer-type.enum'

export class CreateCustomerDto {
  @IsNotEmpty({ message: 'Type is required' })
  @IsEnum(CustomerTypeEnum, {
    message: `Type must be one of: ${Object.values(CustomerTypeEnum).join(
      ', '
    )}`,
  })
  type: CustomerTypeEnum;

  @ValidateIf((o) => o.type === CustomerTypeEnum.PART)
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  @Transform(({ value }) => (value ? value.trim() : value))
  @Transform(({ value }) => (value === '' ? null : value))
  name: string;

  @ValidateIf((o) => o.type === CustomerTypeEnum.PRO)
  @IsString()
  @IsNotEmpty({ message: 'Company name is required' })
  @Transform(({ value }) => (value ? value.trim() : value))
  @Transform(({ value }) => (value === '' ? null : value))
  companyName: string;

  @IsOptional()
  @Transform(({ value }) => (value ? value.trim().toLowerCase() : value))
  @IsEmail({}, { message: 'Invalid email address' })
  email?: string;

  @IsString({ message: 'Invalid address' })
  @IsNotEmpty({ message: 'Address is required' })
  address: string;

  @IsOptional()
  @IsPhoneNumber('TN', { message: 'Invalid phone number' })
  phone?: string;
}
