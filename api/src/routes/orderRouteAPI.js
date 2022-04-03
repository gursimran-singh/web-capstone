const express = require("express");
const router = express.Router();
const orderCtrl = require("../controllers/orderController");

router.route("/").get(orderCtrl.getAllOrders).post(orderCtrl.createOrder);

router.route("/:id").put(orderCtrl.putOrder);

module.exports = router;
