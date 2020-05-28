var http = require("http");
var fs = require("fs");
var path = require("path");
var server = http.createServer();
const baseHref = path.resolve(__dirname, "../resource");

server.on("request", (req, res) => {
  console.log("收到请求");
  var reqUrl = req.url === "/" ? "/index.html" : req.url;
  fs.readdir(baseHref, (err, files) => {
    if (err) return console.log("文件读取失败");
    if (files.some((file) => "/" + file === reqUrl)) {
      fs.readFile(baseHref + reqUrl, (err, data) => {
        if (err) return console.log("文件读取失败");
        switch (reqUrl.split(".")[1]) {
          case "html":
            res.setHeader("Content-Type", "text/html;charset=utf-8");
            break;
          case "jpg":
            res.setHeader("Content-Type", "image/jpeg;charset=utf-8");
            break;
          default:
            res.setHeader("Content-Type", "text/plain;charset=utf-8");
        }
        res.end(data);
      });
    } else {
      res.end("404");
    }
  });
});

server.listen("3000", () => console.log("服务已启动。。。"));
