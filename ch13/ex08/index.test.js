import { beforeAll, afterAll, describe, test, expect } from "@jest/globals";
import { mkdtemp, mkdir, writeFile, rm } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";

import {
  fetchFirstFileSizeA,
  fetchSumOfFileSizesA,
} from "./index.js";

let ROOT;
let DIR_EMPTY;  // 空
let DIR_ONE;    // 1ファイルのみ
let DIR_MULTI;  // 複数ファイル

beforeAll(async () => {
  ROOT = await mkdtemp(join(tmpdir(), "fs-a-"));

  // 空ディレクトリ
  DIR_EMPTY = join(ROOT, "empty");
  await mkdir(DIR_EMPTY);

  // 1ファイルディレクトリ（a.txt: 5 bytes）
  DIR_ONE = join(ROOT, "one");
  await mkdir(DIR_ONE);
  await writeFile(join(DIR_ONE, "a.txt"), "hello"); // 5 bytes

  // 複数ファイル（x.bin: 3 bytes, y.txt: 5 bytes）
  DIR_MULTI = join(ROOT, "multi");
  await mkdir(DIR_MULTI);
  await writeFile(join(DIR_MULTI, "x.bin"), "abc");    // 3 bytes
  await writeFile(join(DIR_MULTI, "y.txt"), "hello");  // 5 bytes
});

afterAll(async () => {
  await rm(ROOT, { recursive: true, force: true });
});

describe("fetchFirstFileSizeA (async/await)", () => {
  test("空ディレクトリなら null を返す", async () => {
    await expect(fetchFirstFileSizeA(DIR_EMPTY)).resolves.toBeNull();
  });

  test("1ファイルのみならそのサイズ（5）を返す", async () => {
    await expect(fetchFirstFileSizeA(DIR_ONE)).resolves.toBe(5);
  });

  test("複数ファイルでは先頭の1つのサイズを返す（3 または 5）", async () => {
    const size = await fetchFirstFileSizeA(DIR_MULTI);
    expect([3, 5]).toContain(size);
  });
});

describe("fetchSumOfFileSizesA (async/await)", () => {
  test("空ディレクトリなら 0 を返す", async () => {
    await expect(fetchSumOfFileSizesA(DIR_EMPTY)).resolves.toBe(0);
  });

  test("1ファイルのみならそのサイズ（5）を返す", async () => {
    await expect(fetchSumOfFileSizesA(DIR_ONE)).resolves.toBe(5);
  });

  test("複数ファイルなら合計（3 + 5 = 8）を返す", async () => {
    await expect(fetchSumOfFileSizesA(DIR_MULTI)).resolves.toBe(8);
  });
});
