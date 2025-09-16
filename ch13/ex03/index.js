import * as fs from "node:fs";
import { promisify } from "node:util";

/** Promiseコンストラクタによる変換版 mkdir */
function mkdir(path, options) {
  return new Promise((resolve, reject) => {
    fs.mkdir(path, options, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}



/** Promiseコンストラクタによる変換版 readdir */
export function readdirP(path, options) {
  return new Promise((resolve, reject) => {
    fs.readdir(path, options, (err, files) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(files);
    });
  });
}

/** util.promisifyで変換版 readdir */
export const readdirAsync = promisify(fs.readdir);



/** Promiseコンストラクタによる変換版 stat */
export function statP(path, options) {
  return new Promise((resolve, reject) => {
    fs.stat(path, options, (err, stats) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(stats);
    });
  });
}

/** util.promisifyで変換版 stat */
export const statAsync = promisify(fs.stat);