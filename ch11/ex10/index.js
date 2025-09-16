// 指定の年・月(1-12)の日数を返す
export function daysInMonth(year, month) {
  if (!Number.isInteger(year) || !Number.isInteger(month) || month < 1 || month > 12) {
    throw new RangeError("year/month is invalid");
  }
  // Date の月は 0 始まりなのでそのまま month を使い、
  // 翌月の0日目 = 当月末日となる
  return new Date(year, month, 0).getDate();
}

// 'YYYY-MM-DD' 形式の開始/終了の平日日数を返す
export function countWeekdaysInclusive(startYmd, endYmd) {
  const s = parseYMDToLocalDate(startYmd);
  const e = parseYMDToLocalDate(endYmd);

  let start = s, end = e;
  if (start > end) [start, end] = [end, start];

  let count = 0;
  const cur = new Date(start.getTime());
  while (cur <= end) {
    const dow = cur.getDay(); // 0=Sun、6=Sat
    if (dow !== 0 && dow !== 6) count++;
    cur.setDate(cur.getDate() + 1);
  }
  return count;
}

// 'YYYY-MM-DD' とロケールを受けて、その日の曜日名をロケール形式で返す
export function weekdayOf(dateYmd, locale, style = "long") {
  const d = parseYMDToLocalDate(dateYmd);
  // Intl はデフォルトでローカルタイムゾーン
  return new Intl.DateTimeFormat(locale, { weekday: style }).format(d);
}

// ローカルタイムゾーンで「先月1日 00:00:00」の Date を返す  ※getMonth/setMonthは使わない
export function firstDayOfPreviousMonthLocal() {
  const d = new Date();
  d.setHours(0, 0, 0, 0); // 当日 0:00:00
  d.setDate(1);           // 今月1日
  d.setDate(0);           // 前月の最終日（今月1日の 0 日前）// 日付だけが0以下になった時点で前月に繰り下がる
  d.setDate(1);           // その月の1日
  return d;
}

// ---- ユーティリティ ----
// 'YYYY-MM-DD' をローカルタイムの Dateへ
function parseYMDToLocalDate(ymd) {
  if (typeof ymd !== "string") throw new TypeError("date string required");
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(ymd);
  if (!m) throw new RangeError("invalid date format");
  const y = Number(m[1]), mo = Number(m[2]), d = Number(m[3]);
  return new Date(y, mo - 1, d, 0, 0, 0, 0);
}


// console.log(daysInMonth(2024, 2)); // 29（うるう年）
// console.log(countWeekdaysInclusive("2025-08-01", "2025-08-17"));
// console.log(weekdayOf("2025-08-17", "ja-JP")); // "日曜日"
// console.log(firstDayOfPreviousMonthLocal()); // 先月1日の Date オブジェクト

