var express = require("express");
var sessionRouter = require("./session");

// 公共
var router = express.Router();
sessionRouter(router)

router.get("/", function (req, res) {
  res.render("index.html");
});

module.exports = router;
