const express = require("express");
const router = express.Router();
const paymentCtrl = require("../controllers/paymentController");


router.route('/')
    .post(paymentCtrl.payment);

module.exports = router;
