const mongoose = require("mongoose");

// 连接数据库
mongoose.connect("mongodb://localhost:27017/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// 创建数据模型
const Cat = mongoose.model("Cat", { name: String });

for (var i = 0; i < 10; i++) {
  const kitty = new Cat({ name: "喵" + i + 1 });
  kitty.save().then(() => console.log("meow"));
}
