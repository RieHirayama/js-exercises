import * as fs from "node:fs";
import * as fsPromises from "node:fs/promises";
import { join } from "node:path";

function fetchFirstFileSize(path, callback) {
  fs.readdir(path, (err, files) => {
    if (err) {
      callback(err);
      return;
    }
    if (files.length === 0) {
      callback(null, null);
      return;
    }

    fs.stat(join(path, files[0]), (err, stats) => {
      if (err) {
        callback(err);
        return;
      }
      callback(null, stats.size);
    });
  });
}

function fetchSumOfFileSizes(path, callback) {
  fs.readdir(path, (err, files) => {
    if (err) {
      callback(err);
      return;
    }

    let total = 0;
    const rest = [...files];

    function iter() {
      if (rest.length === 0) {
        callback(null, total);
        return;
      }

      const next = rest.pop();
      fs.stat(join(path, next), (err, stats) => {
        if (err) {
          callback(err);
          return;
        }
        total += stats.size;
        iter();
      });
    }
    iter();
  });
}


export function fetchFirstFileSizeP(path, options) {
  return fsPromises.readdir(path, options).then((files) => {
    if (files.length === 0) return null;
    const first = files[0];
    return fsPromises.stat(join(path, first)).then((stats) => stats.size);
  });
}

export function fetchSumOfFileSizesP(path, options) {
  return fsPromises.readdir(path, options).then((files) => {
    if (files.length === 0) return 0;
    let promise = Promise.resolve(0);
    for (const name of files) {
      promise = promise.then((sum) =>
        fsPromises.stat(join(path, name)).then((stats) => sum + stats.size)
      );
    }
    return promise;
  });
}
