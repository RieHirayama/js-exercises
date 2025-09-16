import { describe, test, expect } from '@jest/globals';
import { primes } from './index.js';

describe('primesテスト', () => {
  test('先頭10個の素数が正しい', () => {
    const g = primes();
    const first10 = [];
    for (let i = 0; i < 10; i++) {
      first10.push(g.next().value);
    }
    expect(first10).toEqual([2, 3, 5, 7, 11, 13, 17, 19, 23, 29]);
  });

  test('20個目まで進めたときの最後の値は 71', () => {
    const g = primes();
    let last;
    for (let i = 0; i < 20; i++) {
      last = g.next().value;
    }
    // 20個目の素数は 71
    // [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71]
    expect(last).toBe(71);
  });
});

