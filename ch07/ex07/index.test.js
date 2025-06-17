import { mergeSort } from './index.js';

describe('mergeSort', () => {
  test('数値の昇順ソート', () => {
    expect(mergeSort([5, 3, 8, 4, 2])).toStrictEqual([2, 3, 4, 5, 8]);
    expect(mergeSort([])).toStrictEqual([]);
    expect(mergeSort([1])).toStrictEqual([1]);
  });

  test('数値の降順ソート', () => {
    expect(mergeSort([5, 3, 8, 4, 2], (a, b) => b - a)).toStrictEqual([8, 5, 4, 3, 2]);
  });

  test('文字列のソート', () => {
    expect(mergeSort(['banana', 'apple', 'cherry'])).toStrictEqual(['apple', 'banana', 'cherry']);
  });

  test('オブジェクトの配列を特定キーでソート', () => {
    const users = [
      { name: 'Bob', score: 80 },
      { name: 'Alice', score: 90 },
      { name: 'Carol', score: 85 },
    ];
    const sorted = mergeSort(users, (a, b) => b.score - a.score);
    expect(sorted.map(u => u.name)).toStrictEqual(['Alice', 'Carol', 'Bob']);
  });

  test('元の配列を破壊しない', () => {
    const original = [3, 1, 2];
    const copy = [...original];
    mergeSort(original);
    expect(original).toStrictEqual(copy); // 非破壊的
  });
});