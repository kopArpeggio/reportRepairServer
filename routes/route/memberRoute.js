const express = require("express");
const { memberController } = require("../../controllers");

const router = express.Router();

router.get("/get-all-member", memberController.getAllMember);
router.put("/update-member-by-id/:id", memberController.updateMemberById);
router.delete("/delete-member-by-id/:id", memberController.deleteMemberById);
router.post("/create-member", memberController.createMember);

module.exports = router;
