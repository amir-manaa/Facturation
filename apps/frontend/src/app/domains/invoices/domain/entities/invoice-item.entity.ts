export class InvoiceItemEntity {
  constructor(
    public readonly id: string,
    public readonly invoiceId: string,
    public readonly description: string,
    public readonly quantity: number,
    public readonly unitPrice: number,
    public readonly total: number,
    public readonly created_at: Date,
    public readonly updated_at: Date
  ) {}

  // update(data: Partial<InvoiceItem>): InvoiceItem {
  //   return new InvoiceItem(
  //     this.id,
  //     data.description ?? this.description,
  //     data.quantity ?? this.quantity,
  //     data.unitPrice ?? this.unitPrice,
  //     data.total ?? this.total,
  //     this.created_at,
  //     new Date() // Update the updated_at timestamp
  //   );
  // }
}
