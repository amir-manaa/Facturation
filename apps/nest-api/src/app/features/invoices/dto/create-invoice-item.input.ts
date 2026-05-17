import { InputType, Field } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateInvoiceItemInput {
  @Field()
  @IsString()
  description: string;

  @Field()
  @IsNumber()
  quantity: number;

  @Field()
  @IsNumber()
  unitPrice: number;

  @Field()
  @IsNumber()
  total: number;
}
