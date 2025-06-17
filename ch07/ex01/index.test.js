import { addMatrices, multiplyMatrices } from './index.js';

// 加算関数のテスト
describe('addMatrices', () => {
  test('同じサイズの2x2行列を正しく加算できる', () => {
    const A = [[1, 2], [3, 4]];
    const B = [[5, 6], [7, 8]];
    const expected = [[6, 8], [10, 12]];
    expect(addMatrices(A, B)).toEqual(expected);
  });

  test('サイズが異なる行列を加算しようとするとエラー', () => {
    const A = [[1, 2], [3, 4]];
    const B = [[1, 2, 3], [4, 5, 6]];
    expect(() => addMatrices(A, B)).toThrow('行列のサイズが一致しません');
  });
});

// 乗算関数のテスト
describe('multiplyMatrices', () => {
  test('2x2行列を正しく乗算できる', () => {
    const A = [[1, 2], [3, 4]];
    const B = [[5, 6], [7, 8]];
    const expected = [[19, 22], [43, 50]];
    expect(multiplyMatrices(A, B)).toEqual(expected);
  });

  test('2x3と3x2の行列を正しく乗算できる', () => {
    const A = [[1, 2, 3], [4, 5, 6]];
    const B = [[7, 8], [9, 10], [11, 12]];
    const expected = [[58, 64], [139, 154]];
    expect(multiplyMatrices(A, B)).toEqual(expected);
  });

  test('列数と行数が一致しない場合はエラー', () => {
    const A = [[1, 2]];
    const B = [[3, 4], [5, 6], [7, 8]];
    expect(() => multiplyMatrices(A, B)).toThrow('行列のサイズが乗算に適しません');
  });
});