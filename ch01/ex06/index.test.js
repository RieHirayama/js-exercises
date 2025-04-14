import { fib } from './index.js';

describe("fib", () => {
    it("returns 0 when n is less than or equal to 0", () => {
        expect(fib(0)).toBe(0);
        expect(fib(-1)).toBe(0);
    });

    it("returns 1 when n is 1 or 2", () => {
        expect(fib(1)).toBe(1);
        expect(fib(2)).toBe(1);
    });

    it("returns the fibonacci number", () => {
        expect(fib(3)).toBe(2);
        expect(fib(10)).toBe(55);
    });

    it("returns the 75th fibonacci number", () => {
        expect(fib(75)).toBe(2111485077978050);
    });
})