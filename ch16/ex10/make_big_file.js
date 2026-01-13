import fs from "fs";

const out = fs.createWriteStream("file.txt");
const chunk = Buffer.alloc(1024 * 1024, "a"); // 1MB
const mb = 50;

let written = 0;

function writeMore() {
  while (written < mb) {
    written++;
    if (!out.write(chunk)) {
      // バッファがいっぱいになったら drain を待つ
      out.once("drain", writeMore);
      return;
    }
  }
  out.end();
  console.log("created file.txt:", mb, "MB");
}

writeMore();

