import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";

export async function fetchFirstFileSizeA(path, options) {
  const files = await readdir(path, options);
  if (files.length === 0) return null;

  const first = files[0];                 // 先頭エントリ名
  const stats = await stat(join(path, first));
  return stats.size;
}

// export async function fetchSumOfFileSizesA(path, options) {
//   const files = await readdir(path, options);
//   if (files.length === 0) return 0;

//   const statsList = await Promise.all(
//     files.map((name) => stat(join(path, name)))
//   );
//   return statsList.reduce((sum, s) => sum + s.size, 0);
// }

// 上記はPromise.allを使って実施していたが、それは13.10で使わずに書き直した版
export async function fetchSumOfFileSizesA(path, options) {
  const files = await readdir(path, options);
  if (files.length === 0) return 0;

  let sum = 0;
  for (const name of files) {
    const stats = await stat(join(path, name));
    sum += stats.size;
  }
  return sum;
}