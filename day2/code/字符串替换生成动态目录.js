var http = require("http");
var path = require("path");
var fs = require("fs");
const winDir = "/Users/mingxindong/office/pratice/node/resource/";

http
  .createServer((req, res) => {
    fs.readdir(path.resolve(__dirname, "../../resource"), (err, files) => {
      if (err) return console.log("读取目录失败");
      var content = "";
      files.forEach((item) => {
        content += `<tr>
             <td> <a
          class="icon file"
          draggable="true"
          href="/Users/mingxindong/office/pratice/node/resource/${item}"
          >${item}</a></td>
          </tr>`;
      });
      fs.readFile(path.resolve(__dirname, "template2.html"), (err, data) => {
        if (err) return console.log("文件读取失败");
        data = data.toString();
        data = data.replace("^_^", content);
        res.end(data);
      });
    });
  })
  .listen(3000, () => console.log("服务已启动..."));
