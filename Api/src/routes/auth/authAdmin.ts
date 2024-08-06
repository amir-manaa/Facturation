import express, { Router } from "express";

import * as loginAdminController from "@controllers/auth/authAdmin-controller";

export const authAdminRouter: Router = express.Router();

authAdminRouter.route("/").get(loginAdminController.loginAdmin);