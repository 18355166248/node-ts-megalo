const querystring = require("querystring");
const { blogRouter } = require("./router/blog");
const { usersRouter } = require("./router/users");
const { getPostData } = require("./utils/postData");
const { setCookieExpires } = require("./utils/cookie");
const { get, set } = require("./db/redis");
const { accsss } = require("./utils/log");

// const SESSION_DATA = {}; // session数据的缓存 后期会用 redis 替代

const app = (req, res) => {
  // 写入日志
  accsss(
    `${req.method} -- ${req.url} -- ${
      req.headers["user-agent"]
    } -- ${Date.now()}`
  );

  let url = req.url.split("?");

  req.path = url[0]; // 解析请求路径
  req.query = querystring.parse(url[1]); // 获取get请求参数

  res.setHeader("content-type", "application/json");

  // 处理cookie start
  req.cookie = {};
  const cookieStr = req.headers.cookie || "";
  cookieStr.split(";").forEach((item) => {
    if (!item) return;
    const arr = item.split("=");
    req.cookie[arr[0].trim()] = arr[1].trim();
  });
  // 处理cookie end

  // 处理 session ( 不带redis的方案 ) start
  // let userId = req.cookie.userid;
  // let needSetCookie = false;
  // if (!userId) {
  //   needSetCookie = true;
  //   userId = `${Date.now()}_${Math.random()}`;
  //   SESSION_DATA[userId] = {};
  // } else {
  //   if (!SESSION_DATA[userId]) {
  //     SESSION_DATA[userId] = {};
  //   }
  // }
  // req.session = SESSION_DATA;
  // 处理 session ( 不带redis的方案 ) end

  // 处理 session start
  let userId = req.cookie.userid;
  let needSetCookie = false;
  if (!userId) {
    needSetCookie = true;
    userId = `${Date.now()}_${Math.random()}`;
    set(userId, {}); // 这里先设置空对象 在调用登录接口 登录成功后会设置正确的数据到redis
  }
  req.sessionId = userId;
  // 处理 session end

  // 先去redis中查询是否有数据
  get(req.sessionId)
    .then((sessionData) => {
      if (sessionData === null) {
        set(req.sessionId, {});
        req.session = {};
      } else {
        req.session = sessionData;
      }

      return getPostData(req);
    })
    .then((postData) => {
      req.body = postData;

      const blogResult = blogRouter(req, res);
      if (blogResult) {
        blogResult.then((blogData) => {
          if (needSetCookie) {
            res.setHeader("Set-Cookie", [
              `userid=${userId};path=/;httpOnly;expires=${setCookieExpires()};`,
            ]);
          }

          res.end(JSON.stringify(blogData));
        });

        return;
      }

      const usersResult = usersRouter(req, res);
      if (usersResult) {
        usersResult.then((userData) => {
          if (needSetCookie) {
            res.setHeader(
              "Set-Cookie",
              `userid=${userId};path=/;httpOnly;expires=${setCookieExpires()};`
            );
          }

          res.end(JSON.stringify(userData));
        });

        return;
      }

      // 未命中路由 返回404
      res.writeHead(404, { "Content-type": "text/plain" });
      res.write("404 Not Found\n");
      res.end();
    });
};

module.exports = app;
