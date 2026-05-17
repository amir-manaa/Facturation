import { InvoiceStatusEnum } from '@api/app/features/invoices/models/enums/invoice-status.enum';
import { InputType, Field } from '@nestjs/graphql';
import { CreateInvoiceItemInput } from '@api/app/features/invoices/dto/create-invoice-item.input';
import {
  IsString,
  IsDate,
  IsEnum,
  IsNumber,
  IsArray,
  ValidateNested,
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class CreateInvoiceInput {
  @Field()
  @IsString()
  invoiceNumber: string;

  @Field()
  @IsUUID()
  customerId: string;

  @Field(() => [CreateInvoiceItemInput])
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateInvoiceItemInput)
  invoiceItems: CreateInvoiceItemInput[];

  @Field()
  @IsDate()
  @Type(() => Date)
  issueDate: Date;

  @Field()
  @IsDate()
  @Type(() => Date)
  dueDate: Date;

  @Field(() => InvoiceStatusEnum)
  @IsEnum(InvoiceStatusEnum)
  status: InvoiceStatusEnum;

  @Field()
  @IsNumber()
  subtotal: number;

  @Field()
  @IsNumber()
  taxRate: number;

  @Field()
  @IsNumber()
  taxAmount: number;

  @Field()
  @IsNumber()
  paidAmount: number;

  @Field()
  @IsNumber()
  balanceDue: number;

  @Field()
  @IsNumber()
  total: number;
}
