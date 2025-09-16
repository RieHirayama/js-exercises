import { describe, test, expect } from '@jest/globals';
import { fibonacciSequence, fibonacciIterator } from './index.js';

describe('フィボナッチ関数テスト', () => {
  test('先頭5個が期待通り', () => {
    const it = fibonacciIterator();
    expect(it.next().value).toBe(0);
    expect(it.next().value).toBe(1);
    expect(it.next().value).toBe(1);
    expect(it.next().value).toBe(2);
    expect(it.next().value).toBe(3);
  });
  test('fibonacciSequenceとfibonacciIteratorが同じ値を生成する', () => {
    const arr1 = [];
    const it = fibonacciSequence();
    for (let i = 0; i < 10; i++) {
      arr1.push(it.next().value);
    }
    const arr2 = [];
    const it2 = fibonacciIterator();
    for (let i = 0; i < 10; i++) {
      arr2.push(it2.next().value);
    }
    expect(arr1).toEqual(arr2);
  });
});

