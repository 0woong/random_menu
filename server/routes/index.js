var express = require("express");
var router = express.Router();
var menu = require("./menu");
var auth = require("./auth");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.use("/menu", menu);
router.use("/auth", auth);
module.exports = router;
