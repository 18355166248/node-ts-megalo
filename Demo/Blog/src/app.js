const querystring = require("querystring");
const { blogRouter } = require("./router/blog");
const { usersRouter } = require("./router/users");
const { getPostData } = require("./utils/postData");

const app = (req, res) => {
  let url = req.url.split("?");

  req.path = url[0]; // 解析请求路径
  req.query = querystring.parse(url[1]); // 获取get请求参数

  res.setHeader("content-type", "application/json");

  getPostData(req).then((postData) => {
    req.body = postData;

    const blogResult = blogRouter(req, res);
    if (blogResult) {
      blogResult.then((blogData) => {
        res.end(JSON.stringify(blogData));
      });

      return;
    }

    const usersResult = usersRouter(req, res);
    if (usersResult) {
      usersResult.then((userData) => {
        res.end(JSON.stringify(userData));
      });

      return;
    }
  });
};

module.exports = app;
