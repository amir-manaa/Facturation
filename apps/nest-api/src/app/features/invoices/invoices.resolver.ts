import {
  Resolver,
  Query,
  ResolveField,
  Parent,
  Args,
  Mutation,
} from '@nestjs/graphql';
import { InvoiceType } from '@api/app/features/invoices/graphql/types/invoice.type';
import { InvoicesService } from '@api/app/features/invoices/invoices.service';
import { InvoiceMapper } from '@api/app/features/invoices/graphql/mappers/invoice.mapper';
import { InvoiceEntity } from '@api/app/features/invoices/entities/invoice.entity';
import { CustomerType } from '@api/app/features/invoices/graphql/types/customer.type';
import { CustomersService } from '../customers/customers.service';
import { CreateInvoiceInput } from '@api/app/features/invoices/dto/create-invoice.input';
import { UpdateInvoiceInput } from '@api/app/features/invoices/dto/update-invoice.input';

@Resolver(() => InvoiceType)
export class InvoicesResolver {
  constructor(
    private readonly invoicesService: InvoicesService,
    private readonly customersService: CustomersService
  ) {}

  @Query(() => [InvoiceType], { name: 'getInvoices' })
  async findAll(): Promise<InvoiceType[]> {
    const entities = await this.invoicesService.findAll();
    return entities.map(InvoiceMapper.toGraphQL);
  }

  @Query(() => InvoiceType, {
    name: 'getInvoice',
    nullable: true,
  })
  async getInvoice(
    @Args('id', { type: () => String }) id: string
  ): Promise<InvoiceType | null> {
    const invoice = await this.invoicesService.findById(id);

    if (!invoice) {
      return null;
    }

    return InvoiceMapper.toGraphQL(invoice);
  }

  @ResolveField(() => CustomerType, { name: 'customer' })
  async getCustomer(@Parent() invoice: InvoiceEntity) {
    return await this.customersService.findCustomerById(invoice.customerId);
  }

  @ResolveField(() => [InvoiceType], { name: 'items' })
  async getInvoiceItems(@Parent() invoice: InvoiceEntity) {
    return await this.invoicesService.findItemsByInvoiceId(invoice.id);
  }

  @Mutation(() => InvoiceType, { name: 'createInvoice' })
  async createInvoice(
    @Args('createInvoiceInput') createInvoiceInput: CreateInvoiceInput
  ): Promise<InvoiceEntity> {
    return await this.invoicesService.create(createInvoiceInput);
  }

  @Mutation(() => InvoiceType, { name: 'updateInvoice' })
  async updateInvoice(
    @Args('id', { type: () => String }) id: string,
    @Args('updateInvoiceInput') updateInvoiceInput: UpdateInvoiceInput
  ): Promise<InvoiceEntity> {
    return await this.invoicesService.update(id, updateInvoiceInput);
  }

  @Mutation(() => Boolean, { name: 'deleteInvoice' })
  async deleteInvoice(
    @Args('id', { type: () => String }) id: string
  ): Promise<boolean> {
    return await this.invoicesService.delete(id);
  }
}
