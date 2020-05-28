var fs = require("fs");
var http = require("http");
var path = require("path");
var template = require("art-template");
const winDir = "/Users/mingxindong/office/pratice/node/resource/";

http
  .createServer((req, res) => {
    fs.readdir(path.resolve(__dirname, "../../resource"), (err, files) => {
      if (err) return console.log("读取目录失败");
      if (req.url === "/" || req.url === "/index.html") {
        fs.readFile(path.resolve(__dirname, "./template.html"), (err, data) => {
          if (err) return console.log("读取模板文件失败");
          data = template.render(data.toString(), { files });
          res.end(data);
        });
      } else if (files.some((file) => "/" + file === req.url)) {
        fs.readFile(winDir + req.url, (err, data) => {
          if (err) return console.log("读取文件失败");
          switch (req.url.split(".")[1]) {
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
  })
  .listen(3000, () => console.log("服务已启动..."));
