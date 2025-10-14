export class HiraganaChar {
  constructor(ch) {
    if (typeof ch !== 'string' || ch.length === 0) {
      throw new TypeError('HiraganaCharは空でない文字列を指定してください。');
    }

    this.char = ch;
    this.code = ch.codePointAt(0);
  }

  [Symbol.toPrimitive](hint) {
    if (hint === 'number') return this.code;   // 数値文脈
    if (hint === 'string') return this.char;   // 文字列文脈
    return this.char;                          // default文脈はひらがな
  }
}

