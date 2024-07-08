import express from "express";

import * as customerController from "../controllers/customer";

const customerRouter = express.Router();

customerRouter
  .route("/")
  .get(customerController.getCustomers)
  .post(customerController.addCustomer);

  customerRouter
  .route("/:id")
  .get(customerController.getCustomer)
  .post(customerController.updateCustomer)
  .patch(customerController.updateCustomerPassword)
  .delete(customerController.deleteCustomer);

export { customerRouter };
