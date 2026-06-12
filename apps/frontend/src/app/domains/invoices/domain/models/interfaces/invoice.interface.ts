import { InvoiceStatusEnum } from '../enums/invoice-status.enum';
import { IInvoiceItem } from './invoice-item.interface';

export interface IInvoice {
  id: string;
  invoiceNumber: string;
  customer_id: string;
  issueDate: Date;
  dueDate: Date;
  status: InvoiceStatusEnum;
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  items: IInvoiceItem[];
  paidAmount: number;
  balanceDue: number;
  created_at: Date;
  updated_at: Date;
}
