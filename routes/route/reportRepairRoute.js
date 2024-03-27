const express = require("express");
const { reportRepairController } = require("../../controllers");
const passportJWT = require("../../middleware/passportJWT");

const router = express.Router();

router.get("/get-all-report-repair", reportRepairController.getAllReportRepair);
router.post("/create-report-repair", reportRepairController.createRepairReport);
router.delete(
  "/delete-report-repair/:id",
  reportRepairController.deleteReportRepairById
);
router.put(
  "/update-report-repair/:id",
  reportRepairController.updateReportRepairById
);

module.exports = router;
