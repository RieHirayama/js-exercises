import { beforeAll, afterAll, describe, test, expect } from "@jest/globals";
import { mkdtemp, mkdir, writeFile, rm } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";

import {
  fetchFirstFileSizeP,
  fetchSumOfFileSizesP,
} from "./index.js";

let ROOT;
let DIR_ONE;   // 1ファイルのみ
let DIR_MULTI; // 複数ファイル
let DIR_EMPTY; // 空

beforeAll(async () => {
  ROOT = await mkdtemp(join(tmpdir(), "fs-p-"));

  // 空ディレクトリ
  DIR_EMPTY = join(ROOT, "empty");
  await mkdir(DIR_EMPTY);

  // 1ファイルディレクトリ（a.txt: 5 bytes）
  DIR_ONE = join(ROOT, "one");
  await mkdir(DIR_ONE);
  await writeFile(join(DIR_ONE, "a.txt"), "hello"); // 5 bytes

  // 複数ファイルディレクトリ（x.bin: 3 bytes, y.txt: 5 bytes）
  DIR_MULTI = join(ROOT, "multi");
  await mkdir(DIR_MULTI);
  await writeFile(join(DIR_MULTI, "x.bin"), "abc");    // 3 bytes
  await writeFile(join(DIR_MULTI, "y.txt"), "hello");  // 5 bytes
});

afterAll(async () => {
  await rm(ROOT, { recursive: true, force: true });
});

describe("fetchFirstFileSizeP", () => {
  test("空ディレクトリなら null を返す", async () => {
    await expect(fetchFirstFileSizeP(DIR_EMPTY)).resolves.toBeNull();
  });

  test("1ファイルのみならそのサイズを返す（a.txt: 5 bytes）", async () => {
    await expect(fetchFirstFileSizeP(DIR_ONE)).resolves.toBe(5);
  });

  test("複数ファイルでも先頭の1つのサイズを返す", async () => {
    const size = await fetchFirstFileSizeP(DIR_MULTI);
    // どちらかのサイズ（3 or 5）ならOK
    expect([3, 5]).toContain(size);
  });
});

describe("fetchSumOfFileSizesP", () => {
  test("空ディレクトリなら 0 を返す", async () => {
    await expect(fetchSumOfFileSizesP(DIR_EMPTY)).resolves.toBe(0);
  });

  test("1ファイルならそのサイズ（5）", async () => {
    await expect(fetchSumOfFileSizesP(DIR_ONE)).resolves.toBe(5);
  });

  test("複数ファイルは合計（3 + 5 = 8）", async () => {
    await expect(fetchSumOfFileSizesP(DIR_MULTI)).resolves.toBe(8);
  });
});

