import { DynamicSizeArray } from './index.js';

describe('DynamicSizeArray', () => {
  test('初期状態では length が 0', () => {
    const arr = new DynamicSizeArray();
    expect(arr.length()).toBe(0);
  });

  test('push して length が増える', () => {
    const arr = new DynamicSizeArray();
    arr.push(1);
    arr.push(2);
    expect(arr.length()).toBe(2);
    expect(arr.get(0)).toBe(1);
    expect(arr.get(1)).toBe(2);
  });

  test('set で値を上書きできる', () => {
    const arr = new DynamicSizeArray();
    arr.push(10);
    arr.set(0, 99);
    expect(arr.get(0)).toBe(99);
  });

  test('push により再配置（容量拡張）が正しく行われる', () => {
    const arr = new DynamicSizeArray();
    // 初期サイズは 4、それを超える push を行う
    for (let i = 0; i < 10; i++) {
      arr.push(i);
    }
    expect(arr.length()).toBe(10);
    for (let i = 0; i < 10; i++) {
      expect(arr.get(i)).toBe(i);
    }
  });

  test('get/set で範囲外アクセス時はエラーになる', () => {
    const arr = new DynamicSizeArray();
    arr.push(1);
    expect(() => arr.get(-1)).toThrowError();
    expect(() => arr.get(1)).toThrowError();
    expect(() => arr.set(1, 5)).toThrowError();
  });
});