const express = require("express");

const app = express();
app.use("/public/", express.static("./public/"));
app.get("/", function (req, res) {
  res.send("hello word!");
});

app.listen(3000, () => console.log("开始监听..."));
