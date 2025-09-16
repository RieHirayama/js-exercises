// 指定ディレクトリ内のファイル/ディレクトリを再帰的に探索するジェネレータ関数
import fs from 'node:fs';
import path from 'node:path';

export function* walk(rootPath) {
  // 内部で再帰するヘルパ
  function* walkDir(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    // 名前順にする
    entries.sort((a, b) => a.name.localeCompare(b.name, 'en'));

    for (const ent of entries) {
      const p = path.join(dir, ent.name);

      if (ent.isDirectory()) {
        // ディレクトリ自身を先に返し、続いてその中身を再帰でたどる
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

  // ルート直下から開始（※rootPath 自体は返さない）
  yield* walkDir(rootPath);
}

