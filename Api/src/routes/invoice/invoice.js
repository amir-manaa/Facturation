const express = require("express");

const invoiceRouter = require("../../controllers/invoice/invoice");

const router = express.Router();

router.route("/").get(invoiceRouter.getInvoices).post(invoiceRouter.addInvoice);

router
  .route("/:id")
  .get(invoiceRouter.getInvoice)
  .post(invoiceRouter.updateInvoice)
  .delete(invoiceRouter.deleteInvoice);

module.exports = router;
