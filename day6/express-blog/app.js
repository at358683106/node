var express = require("express");
var path = require("path");
var session = require("express-session");

var router = require("./routes/index");
var bodyParser = require("body-parser");

var app = express();

app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));

app.engine("html", require("express-art-template"));

app.set("views", path.join(__dirname, "./views"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


app.use(
  session({
    secret: "iTest",
    resave: false,
    saveUninitialized: false, // 无论你是否使用session，都会给你自动分配一把钥匙
  })
);

app.use(router);


/**
 * 统一错误处理
 * 当有中间件调用next时传递了参数时，会直接调用到这里，不会往下执行
 */
app.use(function (err, req, res, next) {
  res.status(500).json({
    err_code: 500,
    message: err.message,
  });
});

app.use(function (req, res, next) {
  res.render("404.html");
});

app.listen(3000, () => console.log("running"));
