import { InvoiceStatusEnum } from '../domain/models/enums/invoice-status.enum';
import { Injectable } from '@angular/core';
import { InvoiceEntity } from '../domain/entities/invoice.entity';
import { InvoiceItemEntity } from '../domain/entities/invoice-item.entity';
import { InvoiceDto } from './dto/invoice.dto';
import { InvoiceItemDto } from './dto/invoice-item.dto';

// export interface InvoiceItemDto {
//   id: string;
//   invoice_id: string;
//   description: string;
//   quantity: number;
//   unitPrice: number;
//   total: number;
//   created_at: Date;
//   updated_at: Date;
// }
//
//
// export interface InvoiceDto {
//   id: string;
//   invoiceNumber: string;
//   customer_id: string;
//   issueDate: Date;
//   dueDate: Date;
//   status: InvoiceStatusEnum;
//   subtotal: number;
//   taxRate: number;
//   taxAmount: number;
//   total: number;
//   items: InvoiceItem[];
//   paidAmount: number;
//   balanceDue: number;
//   created_at: Date;
//   updated_at: Date;
// }

@Injectable()
export class InvoiceMapper {
  toDomain(dto: InvoiceDto): InvoiceEntity {
    return new InvoiceEntity(
      dto.id,
      dto.invoiceNumber,
      dto.customer_id,
      dto.issueDate,
      dto.dueDate,
      dto.status,
      dto.subtotal,
      dto.taxRate,
      dto.taxAmount,
      dto.total,
      dto.paidAmount,
      dto.balanceDue,
      dto.items.map((item: InvoiceItemDto) => new InvoiceItemEntity(
        item.id,
        item.invoice_id,
        item.description,
        item.quantity,
        item.unitPrice,
        item.total,
        new Date(item.created_at),
        new Date(item.updated_at)
      )),
      new Date(dto.createdAt),
      new Date(dto.updatedAt)
    );
  }

  toDto(entity: InvoiceEntity): InvoiceDto {
    return {
      id: entity.id,
      invoiceNumber: entity.invoiceNumber,
      customer_id: entity.customerId,
      issueDate: new Date(entity.issueDate),
      dueDate: new Date(entity.dueDate),
      status: entity.status,
      subtotal: entity.subtotal,
      taxRate: entity.taxRate,
      taxAmount: entity.taxAmount,
      total: entity.total,
      paidAmount: entity.paidAmount,
      balanceDue: entity.balanceDue,
      items: entity.items.map((item: InvoiceItemEntity) => ({
        id: item.id,
        invoice_id: item.invoiceId,
        description: item.description,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        total: item.total,
        created_at: new Date(item.created_at),
        updated_at: new Date(item.updated_at),
      })),
      createdAt: new Date(entity.created_at),
      updatedAt: new Date(entity.updated_at),
    };
  }
}
