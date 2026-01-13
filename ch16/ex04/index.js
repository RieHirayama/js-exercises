// Shift_JIS の `hello.txt` を読み込み、`iconv-lite` でデコードして標準出力に表示する
import fs from "fs";
import iconv from "iconv-lite";

const filePath = new URL("./hello.txt", import.meta.url);

fs.promises
  .readFile(filePath)
  .then((buffer) => {
    const text = iconv.decode(buffer, "shift_jis");
    console.log(text);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
