import { jest } from '@jest/globals';
import {
  fizzbuzz,
  sumOfSquaredDifference,
  sumOfEvensIsLargerThan42,
} from './index.js';

describe('fizzbuzz', () => {
  let logSpy;

  beforeEach(() => {
    logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    logSpy.mockRestore();
  });

  test('1から5までのFizzBuzz出力が正しい', () => {
    fizzbuzz(5);
    expect(logSpy.mock.calls.map(call => call[0])).toEqual([
      1, 2, 'Fizz', 4, 'Buzz',
    ]);
  });

  test('15までのFizzBuzz出力にFizzBuzzが含まれる', () => {
    fizzbuzz(15);
    const output = logSpy.mock.calls.map(call => call[0]);
    expect(output).toContain('FizzBuzz');
    expect(output[14]).toBe('FizzBuzz');
  });
});

describe('sumOfSquaredDifference', () => {
  test('同じ配列なら差はゼロ', () => {
    expect(sumOfSquaredDifference([1, 2, 3], [1, 2, 3])).toBe(0);
  });

  test('異なる配列なら平方差を計算', () => {
    expect(sumOfSquaredDifference([1, 2, 3], [4, 5, 6])).toBe(27);
  });

  test('負の値も正しく計算される', () => {
    // (-1 - 1)^2 + (-2 - 2)^2 = 4 + 16 = 20
    expect(sumOfSquaredDifference([-1, -2], [1, 2])).toBe(20);
  });
});

describe('sumOfEvensIsLargerThan42', () => {
  test('偶数の合計が42以上なら true', () => {
    expect(sumOfEvensIsLargerThan42([10, 12, 20, 5])).toBe(true);
  });

  test('偶数の合計が42未満なら false', () => {
    expect(sumOfEvensIsLargerThan42([2, 4, 6])).toBe(false);
  });

  test('奇数しかない配列なら false', () => {
    expect(sumOfEvensIsLargerThan42([1, 3, 5, 7])).toBe(false);
  });

  test('空の配列でも false', () => {
    expect(sumOfEvensIsLargerThan42([])).toBe(false);
  });
});