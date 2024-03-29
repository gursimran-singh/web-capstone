const express = require("express");
const router = express.Router();
const itemCtrl = require("../controllers/itemController");

router.route("/")
    .get(itemCtrl.getAllItems)
    .post(itemCtrl.postOneItem);
    
router.route("/search")
    .get(itemCtrl.searchItems)

router.route("/:foodid")
    .get(itemCtrl.getOneItem)
    .put(itemCtrl.putOneItem)
    .delete(itemCtrl.deleteItemById);

router.route("/delete/:foodid")
    .put(itemCtrl.deleteOneItem);




module.exports = router;
