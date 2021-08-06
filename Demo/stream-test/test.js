const fs = require("fs");
const path = require("path");

const filename1 = path.resolve(__dirname, "./data.txt");
const filename2 = path.resolve(__dirname, "./data-bak.txt");

const readSteam = fs.createReadStream(filename1);
const writeStream = fs.createWriteStream(filename2);

readSteam.pipe(writeStream);

readSteam.on("data", (stream) => {
  console.log(111);
});
readSteam.on("end", () => {
  console.log("copy end");
});

// 打印结果
// 111
// 111
// 111
// 111
// 111
// 111
// 111
// copy end
