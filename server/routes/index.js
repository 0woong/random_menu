var express = require("express");
var router = express.Router();
var menu = require("./menu");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.use("menu", menu);
module.exports = router;
