import { bitCount } from "./index.js";
describe("bitCount", () => {
  test("0b111 のビット数は 3", () => {
    expect(bitCount(0b111)).toBe(3);
  });
  test("0b1111111111111111111111111111111のビット数は31", () => {
    expect(bitCount(0b1111111111111111111111111111111)).toBe(31);
  });
});