const express = require("express");
const router = express.Router();
const { checkToken } = require("../middleware/auth");
const imgCtrl = require("../controllers/imageController");

router
  .route("/upload")
  .post(imgCtrl.uploadImage);

module.exports = router;