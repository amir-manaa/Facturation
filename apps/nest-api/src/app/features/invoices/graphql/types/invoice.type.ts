// presentation/graphql/types/invoice.type.ts

import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { GraphQLDeweyDecimal } from 'graphql-scalars';
import { InvoiceStatusEnum } from '../../models/enums/invoice-status.enum';
import { CustomerType } from './customer.type';
import { InvoiceItemType } from './invoice-item.type';

@ObjectType('Invoice')
export class InvoiceType {
  @Field(() => ID)
  id: string;

  @Field()
  invoiceNumber: string;

  @Field()
  customerId: string;

  @Field(() => CustomerType)
  customer: CustomerType;

  @Field()
  issueDate: Date;

  @Field()
  dueDate: Date;

  @Field(() => InvoiceStatusEnum)
  status: InvoiceStatusEnum;

  // ⚠️ voir note Decimal plus bas
  @Field(() => Float)
  subtotal: number;

  @Field(() => Float)
  taxRate: number;

  @Field(() => Float)
  taxAmount: number;

  @Field(() => Float)
  total: number;

  @Field(() => Float)
  paidAmount: number;

  @Field(() => Float)
  balanceDue: number;

  @Field(() => [InvoiceItemType], { nullable: true })
  items: Promise<InvoiceItemType[]>;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
