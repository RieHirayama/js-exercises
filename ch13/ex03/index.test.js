import { beforeAll, afterAll, describe, test, expect } from "@jest/globals";
import { mkdtemp, mkdir, writeFile, rm } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";

import {
  readdirP,
  statP,
  readdirAsync,
  statAsync,
} from "./index.js";

let ROOT;   // 一時ディレクトリ
let fileA;  // ROOT/a.txt
let dirSub; // ROOT/sub

beforeAll(async () => {
  // 一時ディレクトリ作成
  ROOT = await mkdtemp(join(tmpdir(), "fs-promise-test-"));

  // テスト用の構造を作る
  fileA = join(ROOT, "a.txt");
  dirSub = join(ROOT, "sub");

  await writeFile(fileA, "hello");
  await mkdir(dirSub);
});

afterAll(async () => {
  // 後片付け
  // recursive: true サブディレクトリも含めて全削除
  // force: true 存在しなくてもエラーにならない
  await rm(ROOT, { recursive: true, force: true });
});

describe("Promiseコンストラクタによる変換版", () => {
  test("readdirP()は配列でエントリ名を返す", async () => {
    const entries = await readdirP(ROOT);
    // 順序は関係なく、含まれるかを確認
    expect(entries).toEqual(expect.arrayContaining(["a.txt", "sub"]));
  });

  test("statP()でisFile()/isDirectory()を判定できる", async () => {
    const sA = await statP(fileA);
    const sSub = await statP(dirSub);
    expect(sA.isFile()).toBe(true);
    expect(sA.isDirectory()).toBe(false);
    expect(sSub.isDirectory()).toBe(true);
  });
});

describe("util.promisifyで変換版", () => {
  test("readdirAsync()も配列でエントリ名を返す", async () => {
    const entries = await readdirAsync(ROOT);
    expect(entries).toEqual(expect.arrayContaining(["a.txt", "sub"]));
  });

  test("statAsync()でisFile()/isDirectory()を判定できる", async () => {
    const sA = await statAsync(fileA);
    const sSub = await statAsync(dirSub);
    expect(sA.isFile()).toBe(true);
    expect(sA.isDirectory()).toBe(false);
    expect(sSub.isDirectory()).toBe(true);
  });
});