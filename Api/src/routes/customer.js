const express = require("express");

const customerController = require("../controllers/customer");

const router = express.Router();

router
  .route("/")
  .get(customerController.getCustomers)
  .post(customerController.addCustomer);

router
  .route("/:id")
  .get(customerController.getCustomer)
  .post(customerController.updateCustomer)
  .patch(customerController.updateCustomerPassword)
  .delete(customerController.deleteCustomer);

module.exports = router;
