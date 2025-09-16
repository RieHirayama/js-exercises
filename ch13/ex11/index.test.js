import { jest, describe, beforeEach, afterEach, test, expect } from "@jest/globals";
import { retryWithExponentialBackoff } from "./index.js";

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

describe("retryWithExponentialBackoff with fetch", () => {
  test("ネットワークエラー後、リトライして成功", async () => {
    // 1,2回目は reject、3回目で成功
    const fetchMock = jest.fn()
      .mockRejectedValueOnce(new Error("net fail #1"))
      .mockRejectedValueOnce(new Error("net fail #2"))
      .mockResolvedValueOnce(new Response("OK", { status: 200 }));

    global.fetch = fetchMock;

    const p = retryWithExponentialBackoff(
      () => fetch("https://example.com"),
      5,
      { initialDelayMs: 1000, factor: 2 }
    );

    // 初回呼び出し（setTimeout 0）
    await jest.advanceTimersByTimeAsync(0);
    // 1回目失敗 → +1s
    await jest.advanceTimersByTimeAsync(1000);
    // 2回目失敗 → +2s
    await jest.advanceTimersByTimeAsync(2000);
    // 3回目成功
    await expect(p).resolves.toBeInstanceOf(Response);

    expect(fetchMock).toHaveBeenCalledTimes(3);
  });

  test("HTTP 500をステータスで判定してリトライ", async () => {
    const res500 = new Response("ERR", { status: 500 });
    const res200 = new Response("OK", { status: 200 });

    const fetchMock = jest.fn()
      .mockResolvedValueOnce(res500)
      .mockResolvedValueOnce(res200);

    global.fetch = fetchMock;

    const p = retryWithExponentialBackoff(
      async () => {
        const r = await fetch("https://example.com");
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r;
      },
      3
    );

    await jest.advanceTimersByTimeAsync(0);     // 初回（500 → throw）
    await jest.advanceTimersByTimeAsync(1000);  // リトライ1回目（200）

    const r = await p;
    expect(r.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  test("全て失敗で最終的にreject", async () => {
    const fetchMock = jest.fn().mockResolvedValue(
      new Response("ERR", { status: 500 })
    );
    global.fetch = fetchMock;

    const p = retryWithExponentialBackoff(
      async () => {
        const r = await fetch("https://example.com");
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r;
      },
      3 // 3回リトライ＝合計4試行
    );

    const expectReject = expect(p).rejects.toThrow("HTTP 500"); // rejectsでpにcatchをつけるのと同じことをする。先にこの準備をしないとテスト通らない。。

    await jest.advanceTimersByTimeAsync(0);    // 初回（500→throw）
    await jest.advanceTimersByTimeAsync(1000); // リトライ1
    await jest.advanceTimersByTimeAsync(2000); // リトライ2
    await jest.advanceTimersByTimeAsync(4000); // リトライ3（終わり）

    await expectReject;
    expect(fetchMock).toHaveBeenCalledTimes(4);
  });
});