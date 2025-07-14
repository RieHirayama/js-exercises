import { PositiveNumber } from "./index.js";

describe('PositiveNumber (クロージャテスト)', () => {
  test('正の初期値でインスタンスが生成できる', () => {
    const p = new PositiveNumber(10);
    expect(p.getX()).toBe(10);
  });

  test('setX で正の値に変更できる', () => {
    const p = new PositiveNumber(5);
    p.setX(20);
    expect(p.getX()).toBe(20);
  });

  test('setX に 0 を渡すと例外を投げる', () => {
    const p = new PositiveNumber(1);
    expect(() => p.setX(0)).toThrow("x > 0であることが必要です。");
  });

  test('setX に負の値を渡すと例外を投げる', () => {
    const p = new PositiveNumber(2);
    expect(() => p.setX(-10)).toThrow("x > 0であることが必要です。");
  });

  test('初期値に 0 を渡すと例外を投げる', () => {
    expect(() => new PositiveNumber(0)).toThrow("x > 0であることが必要です。");
  });

  test('初期値に負の値を渡すと例外を投げる', () => {
    expect(() => new PositiveNumber(-5)).toThrow("x > 0であることが必要です。");
  });

  test('x には外部から見れない(アクセス不可）', () => {
    const p = new PositiveNumber(10);
    expect('x' in p).toBe(false);
  });
});

