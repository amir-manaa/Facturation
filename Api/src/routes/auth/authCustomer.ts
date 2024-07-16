import express, { Router } from "express";

import * as loginCustomerController from "../../controllers/auth/authCustomer";

export const authCustomerRouter: Router = express.Router();

authCustomerRouter.route("/").get(loginCustomerController.loginCustomer);
