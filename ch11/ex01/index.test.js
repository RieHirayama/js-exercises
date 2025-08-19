import { TypeMap } from "./index.js";

describe("TypeMap", () => {
  class Foo {}

  test("基本: String/Number の set/get", () => {
    const tm = new TypeMap();
    tm.set(String, "hello");
    tm.set(Number, 42);

    expect(tm.get(String)).toBe("hello");
    expect(tm.get(Number)).toBe(42);
  });

  test("未設定キーは undefined を返す", () => {
    const tm = new TypeMap();
    expect(tm.get(String)).toBeUndefined();
  });

  test("クラスインスタンスの set/get", () => {
    const tm = new TypeMap();
    const foo = new Foo();
    tm.set(Foo, foo);

    expect(tm.get(Foo)).toBe(foo);
    expect(tm.get(Foo)).toBeInstanceOf(Foo);
  });

  test("プリミティブ値", () => {
    const tm = new TypeMap();
    tm.set(String, "str");
    tm.set(Number, 123);
    tm.set(Boolean, false);

    expect(tm.get(String)).toBe("str");
    expect(tm.get(Number)).toBe(123);
    expect(tm.get(Boolean)).toBe(false);

    const sym = Symbol("x");
    tm.set(Symbol, sym);
    expect(tm.get(Symbol)).toBe(sym);

    const big = 10n;
    tm.set(BigInt, big);
    expect(tm.get(BigInt)).toBe(10n);
  });

  test("プリミティブ: ラッパーオブジェクト（String/Number/Boolean）も受け付ける", () => {
    const tm = new TypeMap();
    const sObj = new String("wrapped");
    const nObj = new Number(7);
    const bObj = new Boolean(true);

    tm.set(String, sObj);
    tm.set(Number, nObj);
    tm.set(Boolean, bObj);

    expect(tm.get(String)).toBe(sObj);
    expect(tm.get(Number)).toBe(nObj);
    expect(tm.get(Boolean)).toBe(bObj);
  });

  test("不一致: Date キーに文字列はエラー", () => {
    const tm = new TypeMap();
    expect(() => tm.set(Date, "not a date")).toThrow(TypeError);

    // 正常系
    const d = new Date();
    tm.set(Date, d);
    expect(tm.get(Date)).toBe(d);
  });

  test("キーが関数（コンストラクタ）でない場合はエラー", () => {
    const tm = new TypeMap();
    expect(() => tm.set("not-a-constructor", 1)).toThrow(TypeError);
    expect(() => tm.set({}, 1)).toThrow(TypeError);
    expect(() => tm.set(123, 1)).toThrow(TypeError);
  });
});