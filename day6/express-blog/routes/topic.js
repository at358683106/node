// 新建话题、删除话题、修改话题、查看话题列表。。。。
var Topic = require("../models/topic");

// 新建、
module.exports = function (router) {
  router.get("/topic/new", function (req, res) {
    res.render("topic/new.html", {
      user: req.session.user,
    });
  });

  router.post("/topic/new", function (req, res, next) {
    if (!req.session.user) {
      return res.status(401).json({
        err_code: 401,
        message: "账号未登录",
      });
    }
    const { avatar, email, nickname } = req.session.user;
    const body = { ...req.body, avatar, email, nickname };
    new Topic(body).save(function (error) {
      if (error) return next(error);
      return res.status(200).json({
        err_code: 0,
        message: "ok",
      });
    });
  });
};
