const express = require("express");
const router = express.Router();
const orderCtrl = require("../controllers/orderController");

router.route("/").get(orderCtrl.getAllOrders).post(orderCtrl.createOrder);
router.route("/user").get(orderCtrl.getOrdersByUserid);
router.route("/:id").put(orderCtrl.putOrder);

module.exports = router;
