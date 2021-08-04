const { SuccessModel, ErrorModel } = require("../model/resModel");
const { getList } = require("../controller/blog.js");

const blogRouter = (req, res) => {
  const GET = req.method === "GET";
  const POST = req.method === "POST";

  // 获取播客列表
  if (GET && req.path === "/api/blog/list") {
    let author = req.query.author || "";
    let keyword = req.query.keyword || "";

    const result = getList(author, keyword);
    return result.then((res) => {
      return new SuccessModel(res);
    });
  }
};

module.exports = {
  blogRouter,
};
