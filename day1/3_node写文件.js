var fs = require('fs')
var path = require('path')
/**
 * 第一个参数是路径，第二个参数是文件内容，第三个参数是回调函数
 * 只有操作失败时 error才会有值
 */
fs.writeFile('./file/hello.md', '大家好', function(error) {
  if (error) return console.log('文件写入失败')
  console.log('文件写入成功')
})
