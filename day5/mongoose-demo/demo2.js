var mongoose = require("mongoose");

var Schema = mongoose.Schema;
// 连接数据库(指定的数据库不需要存在，当你插入第一条数据之后就会被自动创建出来);
mongoose.connect("mongodb://localhost:27017/itest", {
  useUnifiedTopology: true,
});

var userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
});

/**
 * 将文档结构发布为模型
 * mongoose.model 方法就是用来将一个架构发布为 model
 * 第一个参数： 传入一个大写的名词单数字符串用来表示你的数据库名称
 * mongoose 会自动将大写的名词的字符串生成 小写复数的集合名称 例如这里的 User 最终会变成 users 集合名称
 * 第二个参数 ： 架构
 */

//  返回值 模型构造函数
var User = mongoose.model("User", userSchema);

var admin = new User({
  username: "admin",
  password: "123456",
  email: "admin@admin.com",
});

// 插入数据
// admin.save(function (err, data) {
//   if (err) {
//     return console.log("保存失败");
//   }
//   console.log("保存成功");
// });

// 查询所有
// User.find(function (err, data) {
//   if (err) {
//     return console.log("查询失败");
//   }
//   console.log(data);
// });

// 条件查询
// User.find(
//   {
//     username: "张三",
//   },
//   function (err, data) {
//     if (err) {
//       return console.log("查询失败");
//     }
//     console.log(data);
//   }
// );

// 查询单个
// User.findOne({ username: "张三" }, function (err, data) {
//   if (err) {
//     return console.log("查询失败");
//   }
//   console.log(data);
// });

// 条件删除数据
// User.remove({ username: "张三" }, function (err, data) {
//   if (err) {
//     return console.log("删除失败");
//   }
//   console.log("删除成功");
// });

// 删除单个数据
// User.findOneAndRemove({ username: "admin" }, function (err, data) {
//   if (err) {
//     return console.log("删除失败");
//   }
//   console.log("删除成功");
//   console.log(data)
// });

// 更新数据
User.findByIdAndUpdate(
  "5f4b99c8e787203c74834e82",
  { password: 456789 },
  function (err, data) {
    if (err) {
      return console.log("更新失败");
    }
    console.log("更新成功");
    console.log(data);
  }
);
