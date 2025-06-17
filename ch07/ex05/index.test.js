import { pop, push, shift, unshift, sort } from './index.js';

describe('非破壊的配列操作関数', () => {
  const original = [1, 2, 3, 4, 5];

  test('pop() は最後の要素を除いた新しい配列を返す', () => {
    expect(pop(original)).toStrictEqual([1, 2, 3, 4]);
    expect(original).toStrictEqual([1, 2, 3, 4, 5]); // 破壊されていない
  });

  test('push() は末尾に要素を追加した新しい配列を返す', () => {
    expect(push(original, 6)).toStrictEqual([1, 2, 3, 4, 5, 6]);
    expect(original).toStrictEqual([1, 2, 3, 4, 5]);
  });

  test('shift() は最初の要素を除いた新しい配列を返す', () => {
    expect(shift(original)).toStrictEqual([2, 3, 4, 5]);
    expect(original).toStrictEqual([1, 2, 3, 4, 5]);
  });

  test('unshift() は先頭に要素を追加した新しい配列を返す', () => {
    expect(unshift(original, 0)).toStrictEqual([0, 1, 2, 3, 4, 5]);
    expect(original).toStrictEqual([1, 2, 3, 4, 5]);
  });

  test('sort() はソートされた新しい配列を返す', () => {
    const sorted = sort(original, (a, b) => b - a);
    expect(sorted).toStrictEqual([5, 4, 3, 2, 1]);
    expect(original).toStrictEqual([1, 2, 3, 4, 5]);
  });
});