/**
 * 1、加载http核心模块
 * 2、使用http.createSever()方法创建一个Web服务器，返回一个server实例
 * 3、注册request请求事件，当客户端请求过来时会触发服务器的request请求事件，然后执行回调函数
 * 4、绑定端口号，启动服务器
 */
var http = require('http')
var server = http.createServer()

/**
 * 服务器的作用：
 * 1、提供数据服务
 * 2、发请求
 * 3、接受请求
 * 4、处理请求
 * 5、给个反馈（返回响应信息）
 */
server.on('request', function() {
  console.log('收到客户端请求')
})

// 绑定端口号，启动服务器
server.listen(3000, function() {
  console.log('服务器启动成功了，可以通过http://127.0.0.1:3000/来进行访问')
})
