import express from "express";

import * as adminController from "../controllers/admin";

const adminRouter = express.Router();

adminRouter.route("/").get(adminController.getAdmins).post(adminController.addAdmin);

adminRouter
  .route("/:id")
  .get(adminController.getAdmin)
  .post(adminController.updateAdmin)
  .delete(adminController.deleteAdmin);

export { adminRouter };
