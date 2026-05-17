// src/features/invoices/types/invoice-item.type.ts
import { ObjectType, Field, ID, Float, Int } from '@nestjs/graphql';

@ObjectType('InvoiceItem')
export class InvoiceItemType {
  @Field(() => ID)
  id: string;

  @Field()
  invoiceId: string;

  @Field()
  description: string;

  @Field(() => Int)
  quantity: number;

  @Field(() => Float)
  unitPrice: number;

  @Field(() => Float)
  total: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
