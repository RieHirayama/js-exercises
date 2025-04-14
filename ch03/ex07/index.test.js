import { equalArrays } from "./index.js";

test("ch03-ex07", () => {
  const x = []; // ここを変更
  const y = x+[]; // ここを変更

  expect(equalArrays(x, y)).toBe(true);
  expect(x).not.toEqual(y);
});
