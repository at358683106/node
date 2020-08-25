/**
 * router.js 路由模块
 * 职责：
 *   处理路由
 *   根据不同的请求方法+请求路径设置具体的请求函数
 * 模块职责要单一
 * 我们划分模块的目的就是为了增强项目代码的可维护性
 * 提升开发效率
 */

var fs = require("fs");
var express = require("express");
var Students = require("./student");
var router = express.Router();

router.get("/students", (req, res) => {
  Students.find((err, data) => {
    if (err) return res.status(500).send("Server error");
    res.render("index.html", data);
  });
});

router.get("/students/new", function (req, res) {
  res.render("new.html");
});

router.post("/students/new", function (req, res) {
  Students.save(req.body, (err) => {
    if (err) return res.status(500).send("Server error");
    res.redirect("/students");
  });
});

router.get("/students/edit", function (req, res) {
  Students.findById(req.query.id, (err, data) => {
    if (err) return res.status(500).send("Server error");
    res.render("edit.html", { student: data });
  });
});

router.post("/students/edit", function (req, res) {
  Students.updateById(
    {
      ...req.body,
      id: +req.body.id,
      age: +req.body.age,
      gender: +req.body.gender,
    },
    (err) => {
      if (err) return res.status(500).send("Server error");
      res.redirect("/students");
    }
  );
});

router.get("/students/del", function (req, res) {
  Students.del(+req.query.id, (err) => {
    if (err) return res.status(500).send("Server error");
    console.log("删除成功");
    res.redirect("/students");
  });
});

module.exports = router;
