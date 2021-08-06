const { SuccessModel, ErrorModel } = require("../model/resModel");
const { login } = require("../controller/users");
const { set } = require("../db/redis");

const usersRouter = (req, res) => {
  const GET = req.method === "GET";
  const POST = req.method === "POST";

  if (POST && req.path === "/api/users/login") {
    const { username, password } = req.body;
    // const { username, password } = req.query;

    const result = login(username, password);
    return result.then((res) => {
      if (res.username) {
        req.session.username = res.username;
        req.session.realname = res.realname;
        // 设置 redis session 的值
        set(req.sessionId, req.session);
        return new SuccessModel("登录成功");
      }

      return new ErrorModel("登录失败");
    });
  }

  if (GET && req.path === "/api/users/login-test") {
    if (req.session.username) {
      return Promise.resolve(
        new SuccessModel({
          session: req.session,
        })
      );
    }

    return Promise.resolve(new ErrorModel("登录失败"));
  }
};

module.exports = {
  usersRouter,
};
