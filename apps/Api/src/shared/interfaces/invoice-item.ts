export interface IInvoiceItem {
  id: number;
  quantity: number;
  description: string;
  cost: number;
  invoiceId: number;
}
