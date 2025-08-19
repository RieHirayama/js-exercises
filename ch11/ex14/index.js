// 大小かな・濁点/半濁点・英字の大小を無視して日本語配列をソート
export function sortJapanese(arr) {
  const copy = [...arr];

  if (typeof Intl !== "undefined" && Intl.Collator) {
    const collator = new Intl.Collator("ja", {
      usage: "sort",
      sensitivity: "base",       // 基本文字のみ比較（濁点/大小かな/大文字小文字を無視）
      ignorePunctuation: true,
      numeric: true,             // 文字列に数があれば数値順に
    });
    return copy.sort(collator.compare);
  }
}


// Date -> "令和6年4月2日" のような和暦表記に
export function toJapaneseDateString(date) {
  // Intlの和暦カレンダーを使う
  if (typeof Intl !== "undefined" && Intl.DateTimeFormat) {
    try {
      const fmt = new Intl.DateTimeFormat("ja-JP-u-ca-japanese", {
        era: "long",
        year: "numeric",
        month: "numeric",
        day: "numeric",
      });
      const formatted = fmt.format(date);
      // 「平成31/4/30」→「平成31年4月30日」に変換
      if (/\/\d+\/\d+/.test(formatted)) {
        // 例: "平成31/4/30" → ["平成31", "4", "30"]
        const [era, month, day] = formatted.split("/");
        return `${era}年${month}月${day}日`;
      }
      return formatted;
    } catch {}
  }
}

