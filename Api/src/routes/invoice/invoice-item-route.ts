import express, { Router } from "express";

import * as invoiceItemController from "@controllers/invoice/invoice-item-controller";

export const invoiceItemRouter: Router = express.Router();

invoiceItemRouter
  .route("/")
  .get(invoiceItemController.getInvoiceItems)
  .post(invoiceItemController.addInvoiceItem);

  invoiceItemRouter
  .route("/:id")
  .get(invoiceItemController.addInvoiceItem)
  .post(invoiceItemController.updateInvoiceItem)
  .delete(invoiceItemController.deleteInvoiceItem);
