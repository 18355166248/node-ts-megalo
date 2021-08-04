const crypto = require("crypto");

// 秘钥
const SECRET_KEY = "#@VIOLAwithMEGALO2021-08-04";

// md5加密
function md5(content) {
  const md5 = crypto.createHash("md5");
  return md5.update(content).digest("hex");
}

function getPassword(password) {
  let str = `password=${password};<>${SECRET_KEY}`;

  return md5(str);
}

module.exports = {
  getPassword,
};
