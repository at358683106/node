/**
 * students 数据操作文件模块
 * 职责：操作文件中的数据，只处理数据，不关心业务
 */

var fs = require("fs");
var dbPath = "./db.json";

/**
 * 获取所有学生列表
 * @param {err,data} callback
 * 读取文件成功时，第一个参数为null，
 * 读取文件失败时，第二个参数为undefined
 */
exports.find = function (callback) {
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) return callback(err);
    callback(null, JSON.parse(data));
  });
};

/**
 * 
 * @param {string | number} id 
 * @param {(err,data)=> void} callback 
 */
exports.findById = function (id, callback) {
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) return callback(err);
    var dataJson = JSON.parse(data);
    var res = dataJson.students.find((item) => item.id === parseInt(id));
    if (!res) return callback(err);
    callback(null, res);
  });
};

/**
 *
 * @param {} student
 * @param {(err,data)=> void} callback
 */
exports.save = function (student, callback) {
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) return callback(err);
    var dataJson = JSON.parse(data);
    student.id = dataJson.students[dataJson.students.length - 1]
      ? dataJson.students[dataJson.students.length - 1].id + 1
      : 1;
    dataJson.students.push(student);
    fs.writeFile(dbPath, JSON.stringify(dataJson), (error) => {
      if (error) return callback(err);
      callback(null);
    });
  });
};

/**
 * 更新学生
 */
exports.updateById = function (student, callback) {
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) return callback(err);
    var dataJson = JSON.parse(data);
    var stud = dataJson.students.find((item) => item.id === student.id);
    if (!stud) return callback("找不到该学生的信息");
    for (var key in student) {
      stud[key] = student[key];
    }
    fs.writeFile(dbPath, JSON.stringify(dataJson), (error) => {
      if (error) return callback(err);
      callback(null);
    });
  });
};

/**
 * 删除学生
 */
exports.del = function (id, callback) {
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) return callback(err);
    var dataJson = JSON.parse(data);
    var idx = -1;
    dataJson.students.some((item, index) => {
      if (item.id === id) {
        idx = index;
        return true;
      }
      return false;
    });
    if (idx === -1) return callback("找不到该学生的信息");
    dataJson.students.splice(idx, 1);
    fs.writeFile(dbPath, JSON.stringify(dataJson), (error) => {
      if (error) return callback(err);
      callback(null);
    });
  });
};
