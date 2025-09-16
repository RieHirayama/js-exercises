import { readdir } from "node:fs/promises";
import { join } from "node:path";

export async function* walk(rootPath) {
  async function* walkDir(dir) {
    const entries = await readdir(dir, { withFileTypes: true });

    // 名前順（アルファベット順）にする
    entries.sort((a, b) => a.name.localeCompare(b.name, "en"));

    for (const ent of entries) {
      const p = join(dir, ent.name);

      if (ent.isDirectory()) {
        yield { path: p, isDirectory: true };
        yield* walkDir(p);
      } else if (ent.isFile()) {
        yield { path: p, isDirectory: false };
      } else {
        // シンボリックリンクやその他の種別は無視
        continue;
      }
    }
  }

  // ルート直下から開始（※rootは返さない）
  yield* walkDir(rootPath);
}