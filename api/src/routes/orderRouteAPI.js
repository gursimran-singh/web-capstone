const express = require("express");
const router = express.Router();
const orderCtrl = require("../controllers/orderController");
const { checkToken } = require("../middleware/auth");

router.route("/").get(checkToken,orderCtrl.getAllOrders).post(orderCtrl.createOrder);
router.route("/user").get(checkToken,orderCtrl.getOrdersByUserid);
router.route("/:id").put(orderCtrl.putOrder);

module.exports = router;
