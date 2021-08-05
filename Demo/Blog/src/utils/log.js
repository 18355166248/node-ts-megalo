const fs = require("fs");
const path = require("path");

function writeLog(writeStream, log) {
  writeStream.write(log + "\n\n");
}

function createWriteStream(fileName) {
  const fullPath = path.join(__dirname, "../logs/", fileName);
  // flags: a 打开文件进行追加。 如果文件不存在，则创建该文件。
  const writeStream = fs.createWriteStream(fullPath, { flags: "a" });

  return writeStream;
}

// 写入日志
const accessWriteStream = createWriteStream("access.log");

function accsss(log) {
  writeLog(accessWriteStream, log);
}

module.exports = {
  accsss,
};
