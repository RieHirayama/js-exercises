import { describe, test, expect } from '@jest/globals';
import { resettableCounter } from './index.js';

describe('resettableCounterのテスト', () => {
  test('初期値0からのカウントアップ', () => {
    const g = resettableCounter();
    expect(g.next().value).toBe(0);
    expect(g.next().value).toBe(1);
    expect(g.next().value).toBe(2);
    expect(g.next().value).toBe(3);
    expect(g.next().value).toBe(4);
    expect(g.next().value).toBe(5);
    expect(g.next().value).toBe(6);
    expect(g.next().value).toBe(7);
    expect(g.next().value).toBe(8);
    expect(g.next().value).toBe(9);
  });

  test('throw() で0にリセット', () => {
    const g = resettableCounter();
    expect(g.next().value).toBe(0);
    expect(g.next().value).toBe(1);
    expect(g.next().value).toBe(2);

    const r = g.throw();          // ← リセット
    expect(r.value).toBe(0);
    expect(r.done).toBe(false);

    expect(g.next().value).toBe(1);
    expect(g.next().value).toBe(2);
  });
});

