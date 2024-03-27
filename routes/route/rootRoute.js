const express = require("express");
const { rootController } = require("../../controllers");
const passportJWT = require("../../middleware/passportJWT");
const router = express.Router();

router.get("/migrate", rootController.migrate);
// router.post("/login", rootController.login);
// router.get("/", [passportJWT.isLogin], rootController.getUser);

module.exports = router;
