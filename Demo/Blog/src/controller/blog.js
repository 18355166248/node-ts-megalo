const { exec } = require("../db/mysql");

// 播客列表
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

// 播客详情
const getDetail = (id) => {
  let sql = `select * from blog where id ='${id}'`;
  return exec(sql).then((row) => row[0]);
};

// 新建播客
const createBlog = (blogData = {}) => {
  const { title, content, author } = blogData;
  const sql = `insert into blog (title, content, author, createtime) values ('${title}', '${content}', '${author}', ${Date.now()});`;

  return exec(sql).then((insertData) => insertData);
};

// 更新播客
const updateBlog = (blogData = {}) => {
  const { id, title, content } = blogData;
  let sql = `update blog set `;
  title && (sql += `title= '${title}', `);
  content && (sql += `content= '${content}' `);
  sql += `where id = ${id}`;

  console.log(sql);

  return exec(sql).then((updateData) => updateData.affectedRows > 0);
};

// 删除播客
const deleteBlog = ({ id, author }) => {
  return exec(
    `delete from blog where id =${id} and author='${author}'`,
    (deleteData) => deleteData.affectedRows > 0
  );
};

module.exports = {
  getList,
  getDetail,
  createBlog,
  updateBlog,
  deleteBlog,
};
