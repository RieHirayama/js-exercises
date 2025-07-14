import { fn1, fn2, fn3 } from './index.js';

describe('fn1', () => {
  test('文字`c`を`n`回コンソール出力してから文字`c`を`n`個含む配列を返す', () => {
    expect(fn1(3, 'A')).toEqual(['A', 'A', 'A']);
  });
});

describe('fn2', () => {
  test('`x`の二乗の数値を返す', () => {
    expect(fn2(0)).toBe(0);
    expect(fn2(5)).toBe(25); 
    expect(fn2(-2)).toBe(4); 
  });
});

describe('fn3', () => {
  test('should return 現在時刻のプロパティ`now`を含むオブジェクトを返す', () => {
    expect(fn3()).toHaveProperty('now');
  });
});