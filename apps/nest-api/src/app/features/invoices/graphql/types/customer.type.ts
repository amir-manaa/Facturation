import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { CustomerTypeEnum } from '@api/app/features/customers/models/enums/customer-type.enum';
import { InvoiceType } from '@api/app/features/invoices/graphql/types/invoice.type';

registerEnumType(CustomerTypeEnum, {
  name: 'CustomerType',
});

@ObjectType('Customer')
export class CustomerType {
  @Field(() => ID)
  id: string;

  @Field(() => CustomerTypeEnum)
  type: CustomerTypeEnum;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  companyName?: string;

  @Field()
  address: string;

  @Field({ nullable: true })
  phone?: string;

  @Field(() => [InvoiceType], { nullable: true })
  invoices?: InvoiceType[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
