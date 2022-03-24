const express = require("express");
const router = express.Router();
const categoryCtrl = require("../controllers/categoryController");

router.route("/")
    .get(categoryCtrl.getAllCategories)
    .post(categoryCtrl.createOneCategory);

router.route("/:categoryid")
    .get(categoryCtrl.getOneCategory)
    .put(categoryCtrl.updateOneCategory);

router.route("/delete/:categoryid")
    .put(categoryCtrl.deleteCategory);

module.exports = router;
