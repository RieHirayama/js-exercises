import fs from "fs";

// 指定パスがファイル/ディレクトリ/その他を判定する
export function checkEntry(entryPath) {
  return new Promise((resolve, reject) => {
    fs.stat(entryPath, (err, stats) => {
      if (err) {
        reject(err);
        return;
      }

      if (stats.isFile()) {
        resolve("file");
        return;
      }

      if (stats.isDirectory()) {
        resolve("directory");
        return;
      }

      resolve("other");
    });
  });
}

