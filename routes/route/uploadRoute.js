const express = require("express");
const { uplaodController } = require("../../controllers");

const router = express.Router();

router.post("/upload-image-product", uplaodController.uploadFileDocument);


module.exports = router;
