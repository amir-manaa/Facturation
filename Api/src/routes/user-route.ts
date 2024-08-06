import express, { Router } from "express";

import * as userController from "@controllers/user-controller";

export const userRouter: Router = express.Router();

userRouter
  .route("/")
  .get(userController.getUsers)
  .post(userController.addUser);

userRouter
  .route("/:id")
  .get(userController.getUser)
  .post(userController.updateUser)
  .patch(userController.updateUserPassword)
  .delete(userController.deleteUser);
