const express = require("express");

const adminController = require("../controllers/admin");

const router = express.Router();

router.route("/").get(adminController.getAdmins).post(adminController.addAdmin);

router
  .route("/:id")
  .get(adminController.getAdmin)
  .post(adminController.updateAdmin)
  .delete(adminController.deleteAdmin);

module.exports = router;
