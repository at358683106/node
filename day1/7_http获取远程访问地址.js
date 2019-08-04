var http = require('http')
var server = http.createServer()

server.on('request', function(req, res) {
  console.log(
    `收到客户端请求,地址: ${req.socket.remoteAddress}:${req.socket.remotePort}`
  )
  res.end(req.socket.remoteAddress + ':' + req.socket.remotePort)
})

// 绑定端口号，启动服务器
server.listen(3000, function() {
  console.log('服务器启动成功了，可以通过http://127.0.0.1:3000/ 来进行访问')
})
