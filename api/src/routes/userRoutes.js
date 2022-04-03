const express = require("express");
const router = express.Router();
const { checkToken } = require("../middleware/auth");
const userCtrl = require("../controllers/userController");

router.route("/").get(checkToken, userCtrl.getAllusers);
router.route("/login").post(userCtrl.doLogin);
router.route("/create").post(userCtrl.createUser);
router
  .route("/profile")
  .get(checkToken, userCtrl.getLoggedInUser)
  .put(checkToken, userCtrl.updateUser);

module.exports = router;
