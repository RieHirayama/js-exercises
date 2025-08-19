import { sortJapanese, toJapaneseDateString } from "./index.js";

describe("sortJapanese", () => {
  test("濁点・半濁点の違いを無視してソート（'か' が先、'は/ば/ぱ' は同グループ）", () => {
    const out = sortJapanese(["ば", "か", "ぱ", "は"]);
    expect(out[0]).toBe("か"); // 'か' が先頭
    const rest = new Set(out.slice(1));
    expect(rest).toEqual(new Set(["は", "ば", "ぱ"]));
  });

  test("小書きかなの違いを無視（'つ' と 'っ' を同一視）", () => {
    const out = sortJapanese(["て", "っほ", "つほ"]);
    // 'つ/っ' グループが 'て' より前に来るため、末尾は 'て'
    expect(out[out.length - 1]).toBe("て");
  });
});

describe("toJapaneseDateString", () => {
  test("令和の開始日（2019-05-01）→ 令和1年5月1日", () => {
    const d = new Date(2019, 4, 1); // 2019-05-01
    expect(toJapaneseDateString(d)).toBe("令和1年5月1日");
  });

  test("平成の最終日（2019-04-30）→ 平成31年4月30日", () => {
    const d = new Date(2019, 3, 30);
    expect(toJapaneseDateString(d)).toBe("平成31年4月30日");
  });

  test("平成の初日（1989-01-08）→ 平成1年1月8日", () => {
    const d = new Date(1989, 0, 8);
    expect(toJapaneseDateString(d)).toBe("平成1年1月8日");
  });

  test("昭和の初日（1926-12-25）→ 昭和1年12月25日", () => {
    const d = new Date(1926, 11, 25);
    expect(toJapaneseDateString(d)).toBe("昭和1年12月25日");
  });
});

