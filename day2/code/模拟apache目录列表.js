var http = require("http");
var fs = require("fs");
var path = require("path");
http
  .createServer(function (req, res) {
    fs.readFile(path.resolve(__dirname, "template1.html"), (err, data) => {
      if (err) return console.log("读取文件失败");
      res.end(data);
    });
  })
  .listen(3000, () => {
    console.log("runing");
  });
