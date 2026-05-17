// presentation/graphql/mappers/invoice.mapper.ts
import { InvoiceEntity } from '@api/app/features/invoices/entities/invoice.entity';
import { InvoiceType } from '../types/invoice.type';
import { CustomerMapper } from '@api/app/features/invoices/graphql/mappers/customer.mapper';
import { InvoiceItemMapper } from '@api/app/features/invoices/graphql/mappers/invoice-item.mapper';

export class InvoiceMapper {
  static toGraphQL(entity: InvoiceEntity): InvoiceType {
    return {
      id: entity.id,
      invoiceNumber: entity.invoiceNumber,
      customerId: entity.customerId,
      issueDate: entity.issueDate,
      dueDate: entity.dueDate,
      status: entity.status,
      subtotal: entity.subtotal,
      taxRate: entity.taxRate,
      taxAmount: entity.taxAmount,
      total: entity.total,
      paidAmount: entity.paidAmount,
      balanceDue: entity.balanceDue,
      customer: entity.customer
        ? CustomerMapper.toGraphQL(entity.customer)
        : null,
      items: Promise.resolve(entity.invoiceItems?.map(InvoiceItemMapper.toGraphQL)) || Promise.resolve([]),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
