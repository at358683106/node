var express = require("express");
var path = require("path");
var app = express();

app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));

app.engine("html", require("express-art-template"));

app.set("views", path.join(__dirname, "./views"));

app.get("/", function (req, res) {
  res.render("index.html", {
    title: "首页",
  });
});

app.listen(3000, () => console.log("running"));
