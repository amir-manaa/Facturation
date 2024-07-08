import express from "express";

import * as invoiceItemController from "../../controllers/invoice/invoice-item";

const invoiceItemRouter = express.Router();

invoiceItemRouter
  .route("/")
  .get(invoiceItemController.getInvoiceItems)
  .post(invoiceItemController.addInvoiceItem);

  invoiceItemRouter
  .route("/:id")
  .get(invoiceItemController.addInvoiceItem)
  .post(invoiceItemController.updateInvoiceItem)
  .delete(invoiceItemController.deleteInvoiceItem);

export { invoiceItemRouter };
