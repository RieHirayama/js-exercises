import { any, catching } from "./index.js";

describe('any', () => {
  test('値が 0 のときは false を返す（すべての関数が false）', () => {
    const isNonZero = any(n => n > 0, n => n < 0);
    expect(isNonZero(0)).toBe(false);
  });

  test('値が正のときは true を返す（1つ目の関数が true）', () => {
    const isNonZero = any(n => n > 0, n => n < 0);
    expect(isNonZero(42)).toBe(true);
  });

  test('値が負のときは true を返す（2つ目の関数が true）', () => {
    const isNonZero = any(n => n > 0, n => n < 0);
    expect(isNonZero(-0.5)).toBe(true);
  });
});

describe('catching', () => {
  test('正常に JSON.parse が動作する場合はそのまま返す', () => {
    const safeJsonParse = catching(JSON.parse, (e) => ({ error: e.toString() }));
    expect(safeJsonParse('{"a":1}')).toEqual({ a: 1 });
  });

  test('JSON.parse が例外を投げると error オブジェクトを返す', () => {
    const safeJsonParse = catching(JSON.parse, (e) => ({ error: e.toString() }));
    const result = safeJsonParse('{Invalid JSON}');
    expect(result).toHaveProperty('error');
    expect(result.error).toMatch(/SyntaxError/);
  });
});
