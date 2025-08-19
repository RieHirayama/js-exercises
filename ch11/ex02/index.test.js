import { jest } from '@jest/globals';
import { cache, slowFn } from "./index.js";

describe("cache", () => {
  test("同じオブジェクトで呼び出した場合、2回目以降はキャッシュが返る（同一参照チェック）", () => {
    // 実装 slowFn を使いながら、呼び出し回数を数えたいのでラップ
    const wrapped = jest.fn((o) => slowFn(o));
    const cachedSlowFn = cache(wrapped);

    const obj = { x: 10 };

    const result1 = cachedSlowFn(obj); // slowFn 実行
    const result2 = cachedSlowFn(obj); // キャッシュ

    // 返り値の形は slowFn に合わせる
    expect(result1).toEqual({ input: obj, sum: expect.any(Number) });
    expect(result2).toEqual({ input: obj, sum: expect.any(Number) });

    // キャッシュなら参照が同一
    expect(result1).toBe(result2);

    // slowFn は 1 回しか実行されない
    expect(wrapped).toHaveBeenCalledTimes(1);
  });

  test("異なるオブジェクトでは新しく計算される", () => {
    const wrapped = jest.fn((o) => slowFn(o));
    const cachedSlowFn = cache(wrapped);

    const obj1 = { x: 1 };
    const obj2 = { x: 2 };

    const r1 = cachedSlowFn(obj1);
    const r2 = cachedSlowFn(obj2);

    // それぞれ別の計算結果（参照も異なる）
    expect(r1).toEqual({ input: obj1, sum: expect.any(Number) });
    expect(r2).toEqual({ input: obj2, sum: expect.any(Number) });
    expect(r1).not.toBe(r2);

    expect(wrapped).toHaveBeenCalledTimes(2);
  });

  test("キャッシュを返す（同一参照チェック）", () => {
    const wrapped = jest.fn((o) => slowFn(o));
    const cachedSlowFn = cache(wrapped);

    const obj = { x: 99 };
    const r1 = cachedSlowFn(obj);
    const r2 = cachedSlowFn(obj);

    expect(r1).toBe(r2);
  });
});



