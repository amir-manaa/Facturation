import express, { Router } from "express";

import * as loginUserController from "@controllers/auth/authUser-controller";

export const authUserRouter: Router = express.Router();

authUserRouter.route("/").get(loginUserController.loginUser);
