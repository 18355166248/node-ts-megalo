var mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "511871",
  port: "3306",
  database: "myblog",
});

// 开始连接
con.connect();

// 执行sql语句
var sql = "select * from users;";
con.query(sql, function (err, result) {
  if (err) {
    return console.log(err);
  }
  console.log(result);
  return result;
});

con.end();

// { Error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client at Handshake.Sequence._packetToError
// 解决办法：（修改加密规则为普通模式，默认是严格加密模式）
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
// 'password'是你的数据库密码
