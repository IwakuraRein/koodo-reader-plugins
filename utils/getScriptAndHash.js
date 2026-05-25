const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const filePath = path.join(
  __dirname,
  "../code/dictionary/aoilangEmbedDict.js",
);

try {
  const fileContents = fs.readFileSync(filePath, "utf8").replace(/^[ \t]+/gm,'');
  function getSHA256Hash(string) {
    const hash = crypto.createHash("sha256");
    hash.update(string);
    return hash.digest("hex");
  }

  const hashedString = getSHA256Hash(fileContents);
  const script = JSON.stringify(fileContents);
  console.log(`Script:`);
  console.log(script);
  console.log(`Hash:`);
  console.log(hashedString);
} catch (err) {
  console.error("读取或解析文件时出错:", err);
}
