import { describe, test, expect } from '@jest/globals';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { readLines } from './index.js';

// 一時ファイルを作成してパスを返すヘルパ
// C:\Users\<ユーザー名>\AppData\Local\Temp\jest-readlines-abc123\のようにファイルできる
function writeTmp(content, name = 'readLines.txt') {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'jest-readlines-'));
  const p = path.join(dir, name);
  fs.writeFileSync(p, content, { encoding: 'utf8' });
  return p;
}

describe('readLines', () => {
  test('基本：空行や最後の行も正しく扱う', () => {
    const content = 'alpha\nbeta\ngamma\n\ndelta';
    const fp = writeTmp(content);

    const got = Array.from(readLines(fp));
    expect(got).toEqual(['alpha', 'beta', 'gamma', '', 'delta']);
  });

  test('UTF-8の分割境界でも崩れない（小さいバッファ）', () => {
    // 絵文字＋日本語。最後は改行なし。
    const content = '😀あいう\n😀えお';
    const fp = writeTmp(content);

    const lines = Array.from(readLines(fp, { bufferSize: 3 })); // 3バイトで細切れ
    expect(lines).toEqual(['😀あいう', '😀えお']);
  });

  test('for-ofを途中でbreakすると閉じる（次の next は done:true）', () => {
    const fp = writeTmp('a\nb\nc\nd\n');

    const gen = readLines(fp);
    const seen = [];
    for (const line of gen) {
      seen.push(line);
      if (seen.length === 2) break; // a, b で中断
    }
    expect(seen).toEqual(['a', 'b']);
    // break 後に next() しても done:true になる
    const after = gen.next();
    expect(after.done).toBe(true);
  });
});

