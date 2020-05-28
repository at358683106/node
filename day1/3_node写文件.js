var fs = require("fs");
var path = require("path");
/**
 * 第一个参数是路径，第二个参数是文件内容，第三个参数是回调函数
 * 只有操作失败时 error才会有值
 */
fs.writeFile(path.resolve(__dirname, "file/test.txt"), "大家1111", (error) => {
  if (error) return console.log("文件写入失败");
  console.log("文件写入成功");
});

const data = {
  comments: [
    {
      name: "小米",
      content: "随便写写",
      time: "2020-5-24",
    },
  ],
};

fs.writeFile(
  path.resolve(__dirname, "file/test.json"),
  JSON.stringify(data),
  (error) => {
    if (error) return console.log("文件写入失败");
    console.log("文件写入成功");
  }
);
