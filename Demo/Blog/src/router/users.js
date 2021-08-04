const { SuccessModel, ErrorModel } = require("../model/resModel");
const { login } = require("../controller/users");

const usersRouter = (req, res) => {
  const GET = req.method === "GET";
  const POST = req.method === "POST";
  if (POST && req.path === "/api/users/login") {
    const { username, password } = req.body;

    const result = login(username, password);
    return result.then((res) => {
      return new SuccessModel(res);
    });
  }
};

module.exports = {
  usersRouter,
};
