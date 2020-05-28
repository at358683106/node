var template = require("art-template");
var fs = require("fs");

var ret1 = template.render("hello {{name}}", { name: "Jack" });
console.log(ret1);

var tpl = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>在浏览器中使用art-template</title>
  </head>
  <body>
  {{ if(user) }}
  <ul>
      <li>姓名: {{ user.name }}</li>
      <li>年龄: {{ user.age }}</li>
      <li>性别: {{ user.sex }}</li>
      <li>爱好: {{ each user.hobbies }} {{ $value }} {{ /each }}</li>
  </ul>
  {{ /if }}
  </body>
</html>
`;

var user = {
  name: "小明",
  age: 27,
  sex: "男",
  hobbies: ["听音乐", "看书", "乒乓球"],
};

var ret2 = template.render(tpl, { user });
console.log(ret2);

fs.readFile("./tpl.html", (err, data) => {
  if (err) return console.log("读取文件失败");
  const ret3 = template.render(data.toString(), { user });
  console.log(ret3);
});
