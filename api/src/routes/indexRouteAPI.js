const express = require("express");
const router = express.Router();
const itemCtrl = require("../controllers/itemController");

router.route("/food")
    .get(itemCtrl.getAllItems)
    .post(itemCtrl.postOneItem);

router.route("/food/:foodid").get(itemCtrl.getOneItem);

module.exports = router;
