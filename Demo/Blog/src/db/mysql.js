const mysql = require("mysql");
const { MYSQL_CONF } = require("../config/db");

// 连接数据库
var con = mysql.createConnection(MYSQL_CONF);

// 开始连接
con.connect();

// 执行sql语句
function exec(sql) {
  return new Promise((resolve, reject) => {
    con.query(sql, function (err, result) {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
}

module.exports = {
  exec,
  escape: mysql.escape,
};

// con.end();
