var express = require("express");
var router = require("./router");
var app = express();
var bodyParser = require("body-parser");

/**
 * app.js 入门模块
 * 职责：
 * 创建服务
 * 做一些服务相关配置
 *   模板引擎
 *   body-parser 解析表单 post 请求体
 *   提供静态资源服务
 * 挂载路由
 * 监听端口启动服务
 */

app.use("/node_modules/", express.static("./node_modules"));
app.use("/public/", express.static("./public"));
app.engine("html", require("express-art-template"));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// 挂载路由
app.use(router);
app.listen(3000, () => console.log("监听开始"));
