import { power } from './index.js';

describe('power', () => {
  test('`x`の`n`乗の数値を返す', () => {
    expect(power(0,5)).toBe(0);
    expect(power(5,0)).toBe(1);
    expect(power(3,2)).toBe(9);
    expect(power(5,4)).toBe(625);
    expect(power(1,100)).toBe(1);
    expect(power(7,1)).toBe(7);
    expect(power(2,10)).toBe(1024);
  });
});