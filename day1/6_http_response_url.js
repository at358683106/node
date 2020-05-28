var http = require('http')
var server = http.createServer()

server.on('request', function(request, response) {
  console.log(`收到客户端请求，请求路径是：${request.url}`)
  // 请求返回内容必须为string类型或者二进制
  switch (request.url) {
    case '/':
      response.end('index')
      break
    case '/login':
      response.end('login')
      break
    case '/products':
      const products = [
        {name: 'iphone X',price: '￥8888'},
        {name: 'iphone 8',price: '￥4888'},
        {name: 'iphone 7',price: '￥3888'},
      ]
      response.setHeader('Content-Type','text/plain;charset=utf-8');
      response.end(JSON.stringify(products))
      break
    default:
      response.end('404')
  }-
})

// 绑定端口号，启动服务器
server.listen(3000, function() {
  console.log('服务器启动成功了，可以通过http://127.0.0.1:3000/ 来进行访问')
})
