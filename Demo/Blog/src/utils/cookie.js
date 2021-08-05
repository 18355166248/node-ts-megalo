// 设置cookie过期时间
function setCookieExpires() {
  const date = new Date();
  date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
  return date.toGMTString();
}

module.exports = {
  setCookieExpires,
};
