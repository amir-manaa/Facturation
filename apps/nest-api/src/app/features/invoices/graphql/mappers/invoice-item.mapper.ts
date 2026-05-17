import { InvoiceItemEntity } from '@api/app/features/invoices/entities/invoice-item.entity';
import { InvoiceItemType } from '@api/app/features/invoices/graphql/types/invoice-item.type';

export class InvoiceItemMapper {
  static toGraphQL(entity: InvoiceItemEntity): InvoiceItemType {
    return {
      id: entity.id,
      invoiceId: entity.invoiceId,
      description: entity.description,
      quantity: entity.quantity,
      unitPrice: entity.unitPrice,
      total: entity.total,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
