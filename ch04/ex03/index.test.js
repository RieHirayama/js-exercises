import {sub} from './index.js';

describe('sub', () => {
    test('正の大きい数字から正の小さい数字を引く', () => {
        expect(sub(8, 3)).toBe(5);
    });

    test('正の小さい数字から正の大きい数字を引く', () => {
        expect(sub(3, 8)).toBe(-5);
    });

    test('正の数字から0を引く', () => {
        expect(sub(3, 0)).toBe(3);
    });

    test('0から正の数字を引く', () => {
        expect(sub(0, 7)).toBe(-7);
    });

    test('負の絶対値が大きい数字から負の絶対値が小さい数字を引く', () => {
        expect(sub(-5, -3)).toBe(-2);
    });

    test('負の絶対値が小さい数字から負の絶対値が大きい数字を引く', () => {
        expect(sub(-2, -6)).toBe(4);
    });

    test('正の数字から負の数字を引く', () => {
        expect(sub(5, -3)).toBe(8);
    });

    test('負の数字から正の数字を引く', () => {
        expect(sub(-5, 3)).toBe(-8);
    });
})