var md5 = require("blueimp-md5");
var User = require("../models/user");

// 注册、登陆、退出
module.exports = function (router) {
  router.get("/login", function (req, res) {
    res.render("login.html");
  });

  router.get("/register", function (req, res) {
    res.render("register.html");
  });

  router.post("/register", function (req, res) {
    var body = req.body;
    body.password = md5(md5(body.password));
    new Promise(function (resolve, reject) {
      User.findOne({ email: body.email }, function (err, data) {
        if (err) throw err;
        return resolve(data);
      });
    })
      .then((data) => {
        if (data) {
          return res.status(200).json({
            err_code: 1,
            message: "email already exists",
          });
        }
        User.findOne({ nickname: body.nickname }, function (err, result) {
          if (err) throw err;
          if (result) {
            return res.status(200).json({
              err_code: 2,
              message: "nickname already exists",
            });
          }

          new User(body).save(function (error) {
            if (error) throw error;
            req.session.user = body;
            return res.status(200).json({
              err_code: 0,
              message: "ok",
            });
          });
        });
      })
      .catch((err) =>
        res.status(500).json({
          err_code: 500,
          message: "Internal Error",
        })
      );
  });

  router.post("/login", function (req, res) {
    User.findOne(
      { ...req.body, password: md5(md5(req.body.password)) },
      function (err, data) {
        if (err) throw err;
        if (data) {
          req.session.user = data;
          return res.status(200).json({
            err_code: 0,
            message: "ok",
          });
        }
        return res.status(200).json({
          err_code: 1,
          message: "email or password wrong",
        });
      }
    ).catch((err) =>
      res.status(500).json({
        err_code: 500,
        message: "Internal Error",
      })
    );
  });

  router.get("/logout", function (req, res) {
    req.session.user = null;
    res.redirect("/login");
  });
};
