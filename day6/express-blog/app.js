var express = require("express");
var path = require("path");
var app = express();
var router = require("./routes/index");
var bodyParser = require("body-parser");

app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));

app.engine("html", require("express-art-template"));

app.set("views", path.join(__dirname, "./views"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(router);

app.listen(3000, () => console.log("running"));
