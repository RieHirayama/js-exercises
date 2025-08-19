// endian.test.js
import { littleToBig, bigToLittle } from "./index.js";

describe("Endian conversion functions", () => {
  test("Little → Big の変換が正しく行われる", () => {
    const little = new Uint32Array([0x11223344, 0xAABBCCDD]);
    const expected = [0x44332211, 0xDDCCBBAA];

    const result = littleToBig(little);
    expect(Array.from(result)).toEqual(expected);
  });

  test("Big → Little の変換が正しく行われる", () => {
    const big = new Uint32Array([0x44332211, 0xDDCCBBAA]);
    const expected = [0x11223344, 0xAABBCCDD];

    const result = bigToLittle(big);
    expect(Array.from(result)).toEqual(expected);
  });

  test("Little → Big → Little で元に戻る", () => {
    const src = new Uint32Array([0x01020304, 0xDEADBEEF]);
    const back = bigToLittle(littleToBig(src));
    expect(Array.from(back)).toEqual(Array.from(src));
  });

  test("Big → Little → Big で元に戻る", () => {
    const src = new Uint32Array([0xFEEDC0DE, 0xCAFEBABE]);
    const back = littleToBig(bigToLittle(src));
    expect(Array.from(back)).toEqual(Array.from(src));
  });

  test("空配列の変換でも正常動作する", () => {
    const src = new Uint32Array([]);
    expect(Array.from(littleToBig(src))).toEqual([]);
    expect(Array.from(bigToLittle(src))).toEqual([]);
  });
});
