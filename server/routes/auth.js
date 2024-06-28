var express = require("express");
var router = express.Router();
var authController = require("../controllers/authController");
const authModule = require("../modules/authModule");

router.post("/signup", authController.signUp);
router.post("/signin", authController.signIn);
router.delete("/", authModule.loggedIn, authController.deleteUser);
router.put("/update", authModule.loggedIn, authController.updateUser);
router.get("/profile", authModule.loggedIn, authController.getProfile);
module.exports = router;
