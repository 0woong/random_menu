var express = require("express");
var router = express.Router();
var menuController = require("../controllers/menuController");

router.get("/", menuController.getAllMenu);
router.post("/upload", menuController.uploadMenu);
router.delete("/delete/:id", menuController.deleteMenu);
router.put("/update/:id", menuController.updateMenu);

module.exports = router;
