import { beforeAll, afterAll, describe, test, expect } from "@jest/globals";
import { mkdtemp, mkdir, writeFile, rm } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";

import {
  fetchSumOfFileSizesConcurrent
} from "./index.js";

let ROOT;
let DIR_EMPTY;
let DIR_SMALL;
let DIR_MANY;

beforeAll(async () => {
  ROOT = await mkdtemp(join(tmpdir(), "fs-all-"));

  // 空ディレクトリ
  DIR_EMPTY = join(ROOT, "empty");
  await mkdir(DIR_EMPTY);

  // 小さ目ファイル
  DIR_SMALL = join(ROOT, "small");
  await mkdir(DIR_SMALL);
  await writeFile(join(DIR_SMALL, "a.bin"), "abc");      // 3バイト
  await writeFile(join(DIR_SMALL, "b.txt"), "hello");    // 5バイト
  await writeFile(join(DIR_SMALL, "c.md"),  "test");     // 4バイト

  // 20個のファイルを用意（各10バイト）
  DIR_MANY = join(ROOT, "many");
  await mkdir(DIR_MANY);
  const content = "0123456789"; // 10バイト
  await Promise.all(
    Array.from({ length: 20 }, (_, i) =>
      writeFile(join(DIR_MANY, `f${String(i).padStart(2, "0")}.dat`), content)
    )
  );
});

afterAll(async () => {
  await rm(ROOT, { recursive: true, force: true });
});

describe("fetchSumOfFileSizesConcurrent", () => {
  test("空ディレクトリなら 0 を返す", async () => {
    await expect(fetchSumOfFileSizesConcurrent(DIR_EMPTY)).resolves.toBe(0);
  });

  test("小さ目ファイル３つの合計が正しい（3+5+4=12）", async () => {
    await expect(fetchSumOfFileSizesConcurrent(DIR_SMALL)).resolves.toBe(12);
  });

  test("たくさんのファイルでも正しく合計できる（20 * 10 = 200）", async () => {
    await expect(fetchSumOfFileSizesConcurrent(DIR_MANY)).resolves.toBe(200);
  });
});

