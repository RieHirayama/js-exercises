import { beforeAll, afterAll, describe, test, expect } from "@jest/globals";
import { mkdtemp, mkdir, writeFile, rm } from "node:fs/promises";
import { join, relative } from "node:path";
import { tmpdir } from "node:os";

import { walk } from "./index.js";

let ROOT;
let A, B, C, FOO, BUZ;

beforeAll(async () => {
  ROOT = await mkdtemp(join(tmpdir(), "walk-async-"));

  // 構成を作る
  A = join(ROOT, "A");
  B = join(ROOT, "B");
  C = join(B, "C");
  FOO = join(ROOT, "foo.txt");
  BUZ = join(C, "buz.txt");

  await mkdir(A);
  await mkdir(B);
  await mkdir(C);
  await writeFile(FOO, "hello"); // 5 bytes
  await writeFile(BUZ, "buz");   // 3 bytes
});

afterAll(async () => {
  await rm(ROOT, { recursive: true, force: true });
});

describe("walk(非同期ジェネレータ版)", () => {
  test("指定ディレクトリ配下を、名前順・再帰で列挙できる", async () => {
    const got = [];
    for await (const e of walk(ROOT)) {
      // 相対パス
      got.push({ path: relative(ROOT, e.path), isDirectory: e.isDirectory });
    }

    // 期待される列挙順
    const expected = [
      { path: "A", isDirectory: true },
      { path: "B", isDirectory: true },
      { path: join("B", "C"), isDirectory: true },
      { path: join("B", "C", "buz.txt"), isDirectory: false },
      { path: "foo.txt", isDirectory: false },
    ];

    expect(got).toEqual(expected);
  });

  test("空ディレクトリなら何も列挙しない", async () => {
    const EMPTY = join(ROOT, "EMPTY");
    await mkdir(EMPTY);

    const got = [];
    for await (const e of walk(EMPTY)) {
      got.push(e);
    }
    expect(got).toEqual([]);
  });
});