export interface InvoiceItemDto {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  created_at: Date;
  updated_at: Date;
  invoice_id: string;
}
