const express = require("express");
const { orderController } = require("../../controllers");
const passportJWT = require("../../middleware/passportJWT");

const router = express.Router();

router.post(
  "/create-order",
  [passportJWT.isLogin],
  orderController.createOrder
);

router.get("/get-order", [passportJWT.isLogin], orderController?.getAllOrder);

router.get(
  "/get-order-by-id/:id",
  [passportJWT.isLogin],
  orderController?.getOrderById
);

router.get(
  "/get-order-by-user",
  [passportJWT.isLogin],
  orderController?.getOrderByUser
);

router.post(
  "/get-orderdetail-by-order-id",
  [passportJWT.isLogin],
  orderController?.getOrderDetailByOrderId
);

router.get(
  "/get-orderdetail-by-order-id-array",
  [passportJWT.isLogin],
  orderController?.getOrderDetailByOrderIdArray
);

router.put(
  "/update-order-by-id",
  [passportJWT.isLogin],
  orderController?.updateOrderById
);

module.exports = router;
