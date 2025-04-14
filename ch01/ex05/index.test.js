import { abs, sum, factorial } from "./index.js";

// TypeScript の場合は以下:
// import { abs, sum, factorial } from "./index.ts";

describe("math", () => {
  describe("abs", () => {
    it("returns same value when positive value given", () => {
      expect(abs(42)).toBe(42);
    });

    it("returns negated value when negative value given", () => {
      expect(abs(-42)).toBe(42);
    });

    it("returns zero value when zero given", () => {
      expect(abs(0)).toBe(0);
    });
  });

  describe("sum", () => {
    it("returns the result of the addition", () =>{
      expect(sum([10, 15, 30])).toBe(55);
      expect(sum([0, 0, 0])).toBe(0);
      expect(sum([-10, -15, -30])).toBe(-55);
      expect(sum([10, -15, 30])).toBe(25);
    });
  });

  describe("factorial", () => {
    it("returns the result of the factorial calculation", () =>{
      expect(factorial(0)).toBe(1);
      expect(factorial(1)).toBe(1);
      expect(factorial(2)).toBe(2);
      expect(factorial(3)).toBe(6);
    });
  });
});
