import express, { Router } from "express";

import * as loginAdminController from "@controllers/auth/authAdmin";

export const authAdminRouter: Router = express.Router();

authAdminRouter.route("/").get(loginAdminController.loginAdmin);