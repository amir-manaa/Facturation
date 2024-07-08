import express from "express";

import * as invoiceController from "../../controllers/invoice/invoice";

const invoiceRouter = express.Router();

invoiceRouter.route("/").get(invoiceController.getInvoices).post(invoiceController.addInvoice);

invoiceRouter
  .route("/:id")
  .get(invoiceController.getInvoice)
  .post(invoiceController.updateInvoice)
  .delete(invoiceController.deleteInvoice);

export { invoiceRouter };
