import { jest, describe, beforeEach, afterEach, test, expect } from "@jest/globals";
import { g1, g2, g3, g4 } from "./index.js";

describe("g1～g4の書き換え版テスト", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.useRealTimers();
    console.log.mockRestore();
  });

  test("g1: A→B→Cの順に出力", async () => {
    const p = g1();

    // 999ms: まだ出ない
    await jest.advanceTimersByTimeAsync(999);
    expect(console.log).not.toHaveBeenCalled();

    // +1ms（合計1000）でA
    await jest.advanceTimersByTimeAsync(1);
    expect(console.log).toHaveBeenNthCalledWith(1, "A");

    // +2000msでB
    await jest.advanceTimersByTimeAsync(2000);
    expect(console.log).toHaveBeenNthCalledWith(2, "B");

    // +3000msでC
    await jest.advanceTimersByTimeAsync(3000);
    expect(console.log).toHaveBeenNthCalledWith(3, "C");

    await p; // 連鎖完了を待つ
  });

  test("g2: new PromiseなしでA→B→Cの順に出力", async () => {
    const p = g2();

    await jest.advanceTimersByTimeAsync(1000);
    expect(console.log).toHaveBeenNthCalledWith(1, "A");

    await jest.advanceTimersByTimeAsync(2000);
    expect(console.log).toHaveBeenNthCalledWith(2, "B");

    await jest.advanceTimersByTimeAsync(3000);
    expect(console.log).toHaveBeenNthCalledWith(3, "C");

    await p;
  });

  test("g3: 中間変数なしで'John has 2 friends!'を出力", async () => {
    await g3();
    expect(console.log).toHaveBeenCalledWith("John has 2 friends!");
  });

  test("g4: Promiseを返し、値は42", async () => {
    await expect(g4()).resolves.toBe(42);
  });
});
