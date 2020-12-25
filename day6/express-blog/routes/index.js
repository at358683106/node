var express = require("express");
var sessionRouter = require("./session");
var topicRouter = require("./topic");
var Topic = require("../models/topic");
var dayjs = require("dayjs");

// 公共
var router = express.Router();
sessionRouter(router);
topicRouter(router);

// Topic.remove({}, function (err, data) {
//   if (err) {
//     return console.log("删除失败");
//   }
//   console.log("删除成功");
// });

router.get("/", function (req, res, next) {
  Topic.find((err, data) => {
    if (err) return next(err);
    res.render("index.html", {
      user: req.session.user,
      topics: {
        ...data,
        created_time: dayjs(data.created_time).format("YYYY-MM-DD HH:mm:ss"),
      },
    });
  });
});

module.exports = router;
