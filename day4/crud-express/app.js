var fs = require("fs");
var express = require("express");
var app = express();

app.use("/node_modules/", express.static("./node_modules"));
app.use("/public/", express.static("./public"));
app.engine("html", require("express-art-template"));

app.get("/", (req, res) => {
  fs.readFile("./db.json", "utf8", (err, data) => {
    if (err) return res.status(500).send("Server error");
    res.render("index.html", JSON.parse(data));
  });
});

app.listen(3000, () => console.log("监听开始"));
