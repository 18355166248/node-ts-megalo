const { exec } = require("../db/mysql");

const getList = (author, keyword) => {
  let sql = "select * from blog where 1=1 "; // 避免没有参数报错问题
  if (author) {
    sql += `and author='${author}'`;
  }
  if (keyword) {
    sql += `and title='%${keyword}%'`;
  }

  sql += ` order by createtime desc;`;

  return exec(sql);
};

module.exports = {
  getList,
};
