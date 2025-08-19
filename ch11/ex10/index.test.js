import { jest } from '@jest/globals';
import {
  daysInMonth,
  countWeekdaysInclusive,
  weekdayOf,
  firstDayOfPreviousMonthLocal,
} from "./index.js";

describe("daysInMonth(year, month1to12)", () => {
  test("各月の日数", () => {
    expect(daysInMonth(2025, 1)).toBe(31);
    expect(daysInMonth(2025, 4)).toBe(30);
    expect(daysInMonth(2025, 2)).toBe(28);
    expect(daysInMonth(2024, 2)).toBe(29); // うるう年
  });

  test("不正な月は RangeError", () => {
    expect(() => daysInMonth(2025, 0)).toThrow(RangeError);
    expect(() => daysInMonth(2025, 13)).toThrow(RangeError);
  });
});

describe("countWeekdaysInclusive(startYmd, endYmd)", () => {
  test("同じ週での平日カウント（2025-08-11〜2025-08-17: 月〜日）= 5", () => {
    expect(countWeekdaysInclusive("2025-08-11", "2025-08-17")).toBe(5);
  });

  test("開始と終了が逆でも同じ結果", () => {
    expect(countWeekdaysInclusive("2025-08-17", "2025-08-11")).toBe(5);
  });

  test("同一日が平日の場合は1、週末なら0", () => {
    // 2025-08-11 は月曜
    expect(countWeekdaysInclusive("2025-08-11", "2025-08-11")).toBe(1);
    // 2025-08-16 は土曜
    expect(countWeekdaysInclusive("2025-08-16", "2025-08-16")).toBe(0);
  });

  test("全て週末の範囲は0（2025-08-16〜17: 土日）", () => {
    expect(countWeekdaysInclusive("2025-08-16", "2025-08-17")).toBe(0);
  });
});

describe("weekdayOf(dateYmd, locale, style?)", () => {
  test("ロケールごとの曜日名（long）", () => {
    // 2025-08-17 は日曜日
    expect(weekdayOf("2025-08-17", "ja-JP")).toBe("日曜日");
    expect(weekdayOf("2025-08-17", "en-US")).toBe("Sunday");
  });
});

describe("firstDayOfPreviousMonthLocal()", () => {

  // 各テスト後にタイマーを「本物」に戻す
  afterEach(() => {
    jest.useRealTimers();
  });

  test("固定日時（2025-08-17 12:34:56）", () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2025, 7, 17, 12, 34, 56, 0)); // 月は0始まり

    const d = firstDayOfPreviousMonthLocal();
    // 期待: 2025-07-01 00:00:00.000 （ローカル時刻）
    expect(d.getFullYear()).toBe(2025);
    expect(d.getMonth()).toBe(6);
    expect(d.getDate()).toBe(1);
    expect(d.getHours()).toBe(0);
    expect(d.getMinutes()).toBe(0);
    expect(d.getSeconds()).toBe(0);
    expect(d.getMilliseconds()).toBe(0);
  });

  test("年またぎ（2025-01-10）", () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2025, 0, 10, 8, 0, 0, 0));

    const d = firstDayOfPreviousMonthLocal();
    expect(d.getFullYear()).toBe(2024);
    expect(d.getMonth()).toBe(11);
    expect(d.getDate()).toBe(1);
    expect(d.getHours()).toBe(0);
    expect(d.getMinutes()).toBe(0);
    expect(d.getSeconds()).toBe(0);
    expect(d.getMilliseconds()).toBe(0);
  });
});

