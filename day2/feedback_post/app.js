const http = require("http");
const fs = require("fs");
const path = require("path");
const template = require("art-template");
const querystring = require("querystring");

Date.prototype.Format = function (fmt) {
  const o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "H+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds(), //毫秒
  };
  if (/(Y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (let k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
};

let comments = [];
fs.readFile(path.resolve(__dirname, "data/comments.json"), (err, data) => {
  if (err) return console.log("读取文件失败");
  if (JSON.stringify(data)) comments = JSON.parse(data);
});

http
  .createServer((req, res) => {
    if (req.url === "/") {
      fs.readFile(path.resolve(__dirname, "views/index.html"), (err, data) => {
        if (err) return res.end("404");
        const htmlStr = template.render(data.toString(), { comments });
        res.end(htmlStr);
      });
    } else if (req.url === "/comment") {
      if (req.method.toLowerCase() === "post") {
        let alldata = "";
        req.on("data", (chunk) => {
          alldata += chunk;
        });
        req.on("end", () => {
          const datastring = alldata.toString(); //得到的是一个字符串 需要解析
          const obj = querystring.parse(datastring); //定义一个对象来存放解析后的值
          comments.unshift({
            ...obj,
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
          res.statusCode = 302;
          res.setHeader("Location", "/");
          res.end();
        });
      }
    } else if (req.url === "/post") {
      fs.readFile(path.resolve(__dirname, "views/post.html"), (err, data) => {
        if (err) return res.end("404");
        res.end(data);
      });
    } else if (req.url.indexOf("/public/") === 0) {
      fs.readFile(path.resolve(__dirname, "." + req.url), (err, data) => {
        if (err) return res.end("404");
        res.end(data);
      });
    } else {
      fs.readFile(path.resolve(__dirname, "views/404.html"), (err, data) => {
        if (err) return res.end("404");
        res.end(data);
      });
    }
  })
  .listen(3000, () => console.log("running。。。"));
