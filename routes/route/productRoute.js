const express = require("express");
const { productController } = require("../../controllers");
const passportJWT = require("../../middleware/passportJWT");

const router = express.Router();

router.get("/get-all-product/:search", productController.getAllProduct);
router.put("/update-product-by-id/:id", productController.updateProduct);
router.post("/delete-product-by-id", productController.deleteProduct);
router.post("/create-product", productController.createProduct);
router.get("/get-product-by-id/:id", productController.getProductById);
router.post("/get-all-product-by-id", productController.getAllProductById);
router.post("/search", productController.searchProduct);
router.get("/get-new-product", productController.getNewProduct);

module.exports = router;
