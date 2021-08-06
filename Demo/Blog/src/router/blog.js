const { SuccessModel, ErrorModel } = require("../model/resModel");
const {
  getList,
  getDetail,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controller/blog.js");

const checkLogin = (req) => {
  if (!req.session.username) {
    return Promise.resolve(new ErrorModel("登录失败"));
  }
};

const blogRouter = (req, res) => {
  const GET = req.method === "GET";
  const POST = req.method === "POST";
  const id = req.query.id || "";

  // 获取播客列表
  if (GET && req.path === "/api/blog/list") {
    let author = req.query.author || "";
    let keyword = req.query.keyword || "";

    // 登录验证
    if (req.query.isadmin) {
      const checkLoginResult = checkLogin(req);
      if (checkLoginResult) return checkLoginResult;

      // 如果登录的话且是管理员登录 强制查询自己的播客
      author = req.session.username;
    }

    const result = getList(author, keyword);
    return result.then((res) => {
      return new SuccessModel(res);
    });
  }

  // 获取播客详情
  if (GET && req.path === "/api/blog/detail") {
    const detail = getDetail(id);

    return detail.then((detailData) => {
      return new SuccessModel(detailData);
    });
  }

  // 新建播客
  if (POST && req.path === "/api/blog/create") {
    const checkLoginResult = checkLogin(req);
    if (checkLoginResult) {
      return checkLoginResult;
    }
    req.body.author = req.session.username;

    const res = createBlog(req.body);

    return res.then((data) => {
      return new SuccessModel(data);
    });
  }

  // 更新播客
  if (POST && req.path === "/api/blog/update") {
    const checkLoginResult = checkLogin(req);
    if (checkLoginResult) {
      return checkLoginResult;
    }
    req.body.author = req.session.username;

    const updateBlogResult = updateBlog(req.body);

    return updateBlogResult.then((isUpdate) => {
      if (isUpdate) {
        return new SuccessModel("更新成功");
      }

      return new ErrorModel("更新失败");
    });
  }

  // 删除播客
  if (POST && req.path === "/api/blog/delete") {
    const checkLoginResult = checkLogin(req);
    if (checkLoginResult) {
      return checkLoginResult;
    }
    req.body.author = req.session.username;

    const deleteBlogResult = deleteBlog(req.body);

    return deleteBlogResult.then((isDelete) => {
      if (isDelete) {
        return new SuccessModel("删除成功");
      }

      return new ErrorModel("删除失败");
    });
  }
};

module.exports = {
  blogRouter,
};
