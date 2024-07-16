import express, { Router } from "express";

import * as customerController from "../controllers/customer";

export const customerRouter: Router = express.Router();

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
