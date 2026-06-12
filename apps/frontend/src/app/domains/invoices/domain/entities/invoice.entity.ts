import { InvoiceStatusEnum } from '../models/enums/invoice-status.enum';
// import { InvoiceItem } from '../models/interfaces/invoice-item.interface';
import { InvoiceItemEntity } from './invoice-item.entity';

export class InvoiceEntity {
  constructor(
    public readonly id: string,
    public readonly invoiceNumber: string,
    public readonly customerId: string,
    public readonly issueDate: Date,
    public readonly dueDate: Date,
    public readonly status: InvoiceStatusEnum,
    public readonly subtotal: number,
    public readonly taxRate: number,
    public readonly taxAmount: number,
    public readonly total: number,
    public readonly paidAmount: number,
    public readonly balanceDue: number,
    public readonly items: InvoiceItemEntity[],
    public readonly created_at: Date,
    public readonly updated_at: Date
  ) {}

  isOverdue(): boolean {
    const today = new Date();
    return (
      this.status === InvoiceStatusEnum.OVERDUE ||
      (this.dueDate < today && this.status !== InvoiceStatusEnum.PAID)
    );
  }

  addItem(item: InvoiceItemEntity): InvoiceEntity {
    return new InvoiceEntity(
      this.id,
      this.invoiceNumber,
      this.customerId,
      this.issueDate,
      this.dueDate,
      this.status,
      this.subtotal,
      this.taxRate,
      this.taxAmount,
      this.total,
      this.paidAmount,
      this.balanceDue,
      [...this.items, item],
      this.created_at,
      new Date()
    );
  }

  removeItem(itemId: string): InvoiceEntity {
    const updatedItems = this.items.filter((item) => item.id !== itemId);
    return new InvoiceEntity(
      this.id,
      this.invoiceNumber,
      this.customerId,
      this.issueDate,
      this.dueDate,
      this.status,
      this.subtotal,
      this.taxRate,
      this.taxAmount,
      this.total,
      this.paidAmount,
      this.balanceDue,
      updatedItems,
      this.created_at,
      new Date()
    );
  }

  // updateItem(itemId: string, data: Partial<InvoiceItem>): Invoice {
  //   const updatedItems = this.items.map((item) =>
  //     item.id === itemId ? item.update(data) : item
  //   );
  //   return new Invoice(
  //     this.id,
  //     this.invoiceNumber,
  //     this.issueDate,
  //     this.dueDate,
  //     this.status,
  //     this.subtotal,
  //     this.taxRate,
  //     this.taxAmount,
  //     this.total,
  //     this.paidAmount,
  //     this.balanceDue,
  //     updatedItems,
  //     this.created_at,
  //     new Date()
  //   );
  // }
}
