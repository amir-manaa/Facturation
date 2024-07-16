import express, { Router} from "express";

import * as adminController from "../controllers/admin";

export const adminRouter: Router = express.Router();

adminRouter.route("/").get(adminController.getAdmins).post(adminController.addAdmin);

adminRouter
  .route("/:id")
  .get(adminController.getAdmin)
  .post(adminController.updateAdmin)
  .delete(adminController.deleteAdmin);
