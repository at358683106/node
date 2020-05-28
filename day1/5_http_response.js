var http = require('http')
var server = http.createServer()

server.on('request', function(request, response) {
  console.log(`收到客户端请求，请求路径是：${request.url}`)
  response.write('hello ')
  response.write('world ')
  //   告诉客户端，处理完成
  response.end('end')
})

// 绑定端口号，启动服务器
server.listen(3000, function() {
  console.log('服务器启动成功了，可以通过http://127.0.0.1:3000/ 来进行访问')
})
