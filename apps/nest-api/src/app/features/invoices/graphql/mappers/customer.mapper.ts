// presentation/graphql/mappers/invoice.mapper.ts
import { CustomerType } from '@api/app/features/invoices/graphql/types/customer.type';
import { CustomerEntity } from '../../../customers/entities/customer.entity';
import { InvoiceItemMapper } from '@api/app/features/invoices/graphql/mappers/invoice-item.mapper';
import { InvoiceMapper } from '@api/app/features/invoices/graphql/mappers/invoice.mapper';

export class CustomerMapper {
  static toGraphQL(entity: CustomerEntity): CustomerType {
    return {
      id: entity.id,
      type: entity.type,
      email: entity.email,
      name: entity.name,
      companyName: entity.companyName,
      address: entity.address,
      phone: entity.phone,
      invoices: entity.invoices?.map(InvoiceMapper.toGraphQL) ?? [],
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
