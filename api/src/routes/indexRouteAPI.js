const express = require("express");
const router = express.Router();
const itemCtrl = require("../controllers/itemController");

router.route("/food")
    .get(itemCtrl.getAllItems)
    .post(itemCtrl.postOneItem);

router.route("/food/:foodid").get(itemCtrl.getOneItem)
    .put(itemCtrl.putOneItem)
    // .delete(itemCtrl.deleteOneItem1);

router.route("/food/delete/:foodid")
    .put(itemCtrl.deleteOneItem);

module.exports = router;
