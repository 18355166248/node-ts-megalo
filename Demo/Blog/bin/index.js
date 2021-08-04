const http = require("http");
const app = require("../src/app.js");
const port = 8001;

const server = http.createServer(app);

server.listen(port);
console.log("127.0.0.1:" + port + " 连接成功");
