import {add, sub, mul, div} from './index.js';

describe('複素数の計算テスト', () => {
  const c1 = { real: 1, imag: 2 };
  const c2 = { real: 3, imag: 4 };

  test('足し算', () => {
    const result = add(c1, c2);
    expect(result).toEqual({ real: 4, imag: 6 });
  });

  test('引き算', () => {
    const result = sub(c1, c2);
    expect(result).toEqual({ real: -2, imag: -2 });
  });

  test('掛け算', () => {
    const result = mul(c1, c2);
    expect(result).toEqual({ real: -5, imag: 10 });
  });

  test('割り算', () => {
    const result = div(c1, c2);
    expect(result).toEqual({ real: 0.44, imag: 0.08 });
  });
})