import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";

export async function fetchSumOfFileSizesConcurrent(path, options) {
  const files = await readdir(path, options);
  if (files.length === 0) return 0;

  // 全ての stat を同時並行で実行
  const sizes = await Promise.all(
    files.map(async (name) => {
      const s = await stat(join(path, name));
      return s.size;
    })
  );

  return sizes.reduce((sum, n) => sum + n, 0);
}