const express = require("express");

const app = express();
app.use("/public/", express.static("./public/"));
app.use(express.static("./public/")); // 省略public 来操作

app
  .get("/", function (req, res) {
    res.send("hello word!");
  })
  .get("/login", (req, res) => res.send("login"));

app.listen(3000, () => console.log("开始监听..."));
