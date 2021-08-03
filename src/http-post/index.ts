const http = require("http");

const server = http.createServer((req: any, res: any) => {
  if (req.method === "POST") {
    console.log("content=type: ", req.headers["content-type"]);

    let postData = "";
    req.on("data", (chunk: any) => {
      postData += chunk;
    });
    req.on("end", () => {
      console.log(JSON.parse(postData));
      res.end("hello world!");
    });
  }
});

server.listen(8000);
console.log("OK");
