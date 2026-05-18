# Invoice Module

## Get invoices

```graphql
query {
  getInvoices {
    id,
    items {id},
    customer {id}
  }
}
```

## Create invoices
```graphql
mutation {
  createInvoice(
    createInvoiceInput: {
      invoiceNumber: "INV-31"
      customerId: "07fadaff-b262-44b3-89fe-d2d955e3708e"
      issueDate: "2026-05-06 21:33:42.176045"
      dueDate: "2026-05-06 21:33:42.176045"
      status: OPEN
      subtotal: 10.00
      taxRate: 9.9999
      taxAmount: 10.00
      paidAmount: 10.00
      balanceDue: 10.00
      total: 10.00
      invoiceItems: [
        {
          description: "description"
          quantity: 1
          unitPrice: 10.00
          total: 10.00
        }
        {
          description: "description"
          quantity: 2
          unitPrice: 10.00
          total: 10.00
        }
      ]
    }
  ) {
    id
    invoiceNumber
    customerId
    issueDate
    dueDate
    status
    subtotal
    taxRate
    taxAmount
    paidAmount
    balanceDue
  }
}
```

## Update invoices
```graphql
mutation {
  updateInvoice(id:"5dda2346-72c6-4035-b017-2a5d0d6e6001", updateInvoiceInput: {
    invoiceNumber: "INV-010"
  })
  {
    id,
    customerId
  }
}
```
## Delete invoices
```graphql
mutation {
  deleteInvoice(id:"5dda2346-72c6-4035-b017-2a5d0d6e6001")
}
```
