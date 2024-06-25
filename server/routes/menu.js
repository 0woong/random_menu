var express = require("express");
var router = express.Router();
var menuController = require("../controllers/menuController");

router.get("/", menuController.getAllMenu);
router.post("/upload", menuController.uploadMenu);

module.exports = router;
