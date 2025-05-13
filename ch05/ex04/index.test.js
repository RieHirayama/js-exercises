import { fibonacciWhile, fibonacciDoWhile, fibonacciFor } from './index.js';

describe('fibonacciWhile', () => {
    test('Whileフィボナッチテスト', () => {
        expect(fibonacciWhile()).toEqual([1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);
    });
});

describe('fibonacciDoWhile', () => {
    test('DoWhileフィボナッチテスト', () => {
        expect(fibonacciDoWhile()).toEqual([1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);
    });
});

describe('fibonacciFor', () => {
    test('Forフィボナッチテスト', () => {
        expect(fibonacciFor()).toEqual([1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);
    });
}); 