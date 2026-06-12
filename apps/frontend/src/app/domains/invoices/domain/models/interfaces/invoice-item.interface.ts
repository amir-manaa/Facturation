export interface IInvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  created_at: Date;
  updated_at: Date;
}
