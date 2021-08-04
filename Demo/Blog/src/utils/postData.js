function getPostData(req) {
  return new Promise((resolve) => {
    if (
      req.method !== "POST" ||
      req.headers["content-type"] !== "application/json"
    ) {
      return resolve({});
    }

    let postData = "";

    req.on("data", (chunk) => {
      postData += chunk;
    });

    req.on("end", () => {
      if (!postData) return resolve({});
      resolve(JSON.parse(postData));
    });
  });
}

module.exports = { getPostData };
