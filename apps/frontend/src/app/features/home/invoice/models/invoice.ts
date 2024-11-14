export interface IInvoice {
  id: string;
  totalNpTax: number;
  total: number;
  status: number;
  createdAt: Date;
  updatedAt: Date;
  customerId: string;
}
