import fs from "fs";

const filePath = new URL("./sample.bin", import.meta.url);

// 初期データを書き込み
fs.writeFileSync(filePath, Buffer.from([0x41, 0x42, 0x43]));

// 16バイトまで拡張
fs.truncateSync(filePath, 16);

console.log("created:", filePath.pathname);
