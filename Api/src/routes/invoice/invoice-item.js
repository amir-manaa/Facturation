const express = require("express");

const invoiceItemRouter = require("../../controllers/invoice/invoice-item");

const router = express.Router();

router
  .route("/")
  .get(invoiceItemRouter.getInvoiceItems)
  .post(invoiceItemRouter.addInvoiceItem);

router
  .route("/:id")
  .get(invoiceItemRouter.addInvoiceItem)
  .post(invoiceItemRouter.updateInvoiceItem)
  .delete(invoiceItemRouter.deleteInvoiceItem);

module.exports = router;
