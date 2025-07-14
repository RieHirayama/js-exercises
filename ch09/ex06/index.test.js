import { TypedMap } from "./index.js";

describe("TypedMap (composition version)", () => {
  test("正常に初期化できる", () => {
    const m = new TypedMap("string", "number", [["a", 1], ["b", 2]]);
    expect(m.get("a")).toBe(1);
    expect(m.get("b")).toBe(2);
  });

  test("型不一致の初期化でエラー", () => {
    expect(() => {
      new TypedMap("string", "number", [["a", "NG"]]);
    }).toThrow("Wrong type for entry [a, NG]");
  });

  test("setメソッドで正常に追加できる", () => {
    const m = new TypedMap("string", "boolean");
    m.set("yes", true);
    expect(m.get("yes")).toBe(true);
  });

  test("setメソッドでキー型エラーをスロー", () => {
    const m = new TypedMap("string", "boolean");
    expect(() => m.set(123, true)).toThrow("123 is not of type string");
  });

  test("setメソッドで値型エラーをスロー", () => {
    const m = new TypedMap("string", "boolean");
    expect(() => m.set("yes", "no")).toThrow("no is not of type boolean");
  });

});