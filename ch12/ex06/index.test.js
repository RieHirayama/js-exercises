import { describe, test, expect } from '@jest/globals';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { walk } from './index.js';

// テンポラリ配下にテスト用ツリーを作る
function makeTempTree() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'jest-walk-'));

  // 構造:
  // root/
  //   a.txt
  //   empty/
  //   sub1/
  //     b.txt
  //   sub2/
  //     nested/
  //       c.txt
  fs.writeFileSync(path.join(root, 'a.txt'), 'A', 'utf8');

  fs.mkdirSync(path.join(root, 'empty'));

  fs.mkdirSync(path.join(root, 'sub1'));
  fs.writeFileSync(path.join(root, 'sub1', 'b.txt'), 'B', 'utf8');

  fs.mkdirSync(path.join(root, 'sub2'));
  fs.mkdirSync(path.join(root, 'sub2', 'nested'));
  fs.writeFileSync(path.join(root, 'sub2', 'nested', 'c.txt'), 'C', 'utf8');

  return root;
}

function sortByPath(list) {
  return [...list].sort((x, y) => x.path.localeCompare(y.path, 'en'));
}

describe('walkのテスト', () => {
  test('ファイルとディレクトリを列挙する', () => {
    const root = makeTempTree();

    const got = Array.from(walk(root));
    const gotSorted = sortByPath(got);

    const expectList = [
      { path: path.join(root, 'a.txt'), isDirectory: false },
      { path: path.join(root, 'empty'), isDirectory: true },
      { path: path.join(root, 'sub1'), isDirectory: true },
      { path: path.join(root, 'sub1', 'b.txt'), isDirectory: false },
      { path: path.join(root, 'sub2'), isDirectory: true },
      { path: path.join(root, 'sub2', 'nested'), isDirectory: true },
      { path: path.join(root, 'sub2', 'nested', 'c.txt'), isDirectory: false },
      // シンボリックリンクは含まれない想定
    ];
    const expectSorted = sortByPath(expectList);

    expect(gotSorted).toEqual(expectSorted);
  });

  test('root 自体は列挙に含めない', () => {
    const root = makeTempTree();
    const paths = Array.from(walk(root)).map(x => x.path);
    expect(paths).not.toContain(root);
  });

  test('空ディレクトリなら空配列', () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'jest-walk-empty-'));
    const empty = path.join(root, 'empty');
    fs.mkdirSync(empty);

    const items = Array.from(walk(empty));
    expect(items).toEqual([]);
  });
});

