import { InvoiceItemDto } from "./invoice-item.dto";
import { InvoiceStatusEnum } from "../../domain/models/enums/invoice-status.enum";

export interface InvoiceDto {
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
  paidAmount: number;
  balanceDue: number;
  createdAt: Date;
  updatedAt: Date;
  items: InvoiceItemDto[];
}
