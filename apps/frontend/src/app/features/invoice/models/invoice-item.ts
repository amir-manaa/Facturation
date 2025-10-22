export interface IInvoiceItem {
  id: string;
  quantity: number;
  description: string;
  cost: number;
  createdAt: Date;
  updatedAt: Date;
  invoiceId: string;
}
