var fs = require("fs");
var path = require("path");
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
require("./utils");

// app.set('views', '目录路径');  // 默认view为render 函数的默认路径
// app.set('views', './views/'); // 默认view为render 函数的默认路径

app.use("/public/", express.static("./public/"));
app.engine("html", require("express-art-template"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

let comments = [];
fs.readFile(path.resolve(__dirname, "data/comments.json"), (err, data) => {
  if (err) return console.log("读取文件失败");
  if (JSON.stringify(data)) comments = JSON.parse(data);
});

app.get("/", (_, res) => res.render("index.html", { comments }));
app.get("/post", (_, res) => res.render("post.html"));
app.post("/post", (req, res) => {
  comments.unshift({
    ...req.body,
    time: new Date().Format("YYYY-MM-dd HH:mm"),
  });
  fs.writeFile(
    path.resolve(__dirname, "data/comments.json"),
    JSON.stringify(comments),
    (error) => {
      if (error) return console.log("文件写入失败");
      console.log("文件写入成功");
    }
  );
  res.redirect("/");
});
app.get("/comment", (req, res) => {
  comments.unshift({
    ...req.query,
    time: new Date().Format("YYYY-MM-dd HH:mm"),
  });
  fs.writeFile(
    path.resolve(__dirname, "data/comments.json"),
    JSON.stringify(comments),
    (error) => {
      if (error) return console.log("文件写入失败");
      console.log("文件写入成功");
    }
  );
  res.redirect("/");
});

app.listen(3000, () => console.log("开始监听..."));
