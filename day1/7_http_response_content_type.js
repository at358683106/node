var http = require("http");
var server = http.createServer();

server.on('request', (req, res) => {
  console.log(`收到客户端请求`);
  switch (req.url) {
    case "/":
      res.end("hello");
      break;
    case "/a":
      res.end("你好");
      break;
    case "/b":
      res.setHeader("Content-Type", "text/plain;charset=utf-8");
      res.end('<h1>你好</h1>');
      break;
      case "/c":
      res.setHeader("Content-Type", "text/html;charset=utf-8");
      res.end('<h1>测试<a href="baidu.com">百度</a></h1>');
      break;
    default:
      res.end("404");
  }
});

// 绑定端口号，启动服务器
server.listen(3000, function() {
  console.log('服务器启动成功了，可以通过http://127.0.0.1:3000/ 来进行访问')
})

