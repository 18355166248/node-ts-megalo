const mysql = require('mysql')

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '511871',
  port: '3306',
  database: 'mybog'
})

// 开始连接
con.connect()

// 执行sql语句
const sql = 'select * from users;'
con.query(sql, (err: any, result: any) => {
  if (err) {
    return console.log(err)
  }
  console.log(result)
  return result
})

con.end()