// 在node.js不存在bom和dom
var fs = require('fs')
var path = require('path')
/**
 * readFile 第一个参数是文件路径一般最好是绝对路径,第二个参数是回调函数，参数是error和data
 * 成功时 data 返回一段16进制
 */
fs.readFile(path.resolve(__dirname, '../README.md'), function(error, data) {
  if (data) return console.log(data.toString())
  console.log(error)
})
