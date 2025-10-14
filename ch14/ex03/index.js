// アクセント付き文字などを普通の文字に変える関数
function removeAccents(text) {
  // NFD形式（合成文字分解）でUnicode正規化し、\u0300-\u036fの範囲を削除
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export class IgnoreAccentPattern {
  constructor(pattern) {
    if (pattern instanceof RegExp) {  // 引数が正規表現だったとき
      const source = removeAccents(pattern.source); // patternの中身もアクセント除去
      const flags = pattern.flags;                     // gやiなどの正規表現のオプションを文字列で取得
      this.regExpForMatch = new RegExp(source, flags);

      // search用にgを外して1回だけ検索する正規表現を作成
      const flagsWithoutG = flags.replace("g", "");
      this.regExpForSearch = new RegExp(source, flagsWithoutG);

    } else if (typeof pattern === "string") { // 引数が文字列だったとき
      const source = removeAccents(pattern);
      this.regExpForMatch = new RegExp(source);
      this.regExpForSearch = new RegExp(source);

    } else {
      throw new TypeError("文字列または正規表現を渡してください。");
    }
  }

  [Symbol.search](targetString) {
    const clean = removeAccents(String(targetString)); // 対象文字列側もアクセント除去
    return clean.search(this.regExpForSearch);
  }

  [Symbol.match](targetString) {
    const clean = removeAccents(String(targetString)); // 対象文字列側もアクセント除去
    return clean.match(this.regExpForMatch);
  }
}

