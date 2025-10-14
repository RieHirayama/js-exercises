import { HiraganaChar } from './index.js';

describe('HiraganaChar', () => {
  test('プロパティ確認', () => {
    const a = new HiraganaChar('あ');
    expect(a.char).toBe('あ');
    expect(a.code).toBe('あ'.codePointAt(0));
  });

  test('toPrimitiveのテスト（string/number/default）', () => {
    const a = new HiraganaChar('あ');
    // 文字列文脈
    expect(String(a)).toBe('あ');
    expect(`${a}`).toBe('あ');

    // 数値文脈
    expect(Number(a)).toBe('あ'.codePointAt(0));
    expect(+a).toBe('あ'.codePointAt(0)); // 単項+は数値化して表示するはず

    // default文脈
    expect(a + 0).toBe('あ0'); // defaultはstring優先（+は片方が文字列であれば文字列にして連結）
  });

  test('比較演算子での50音順（UTF-16コード順）', () => {
    const a = new HiraganaChar('あ'); // U+3042
    const i = new HiraganaChar('い'); // U+3044
    const u = new HiraganaChar('う'); // U+3046
    expect(a < i).toBe(true);
    expect(u > i).toBe(true);
    expect(a > u).toBe(false);
  });

  test('sort（デフォルト：文字列比較 → ひらがな順）', () => {
    const arr = [new HiraganaChar('い'), new HiraganaChar('う'), new HiraganaChar('あ')];
    const sorted = arr.sort(); // 文字列化されて比較される（toPrimitive string）
    expect(sorted.map(String)).toStrictEqual(['あ', 'い', 'う']);
  });

  test('sort（数値比較：UTF-16コードで比較）', () => {
    const arr = [new HiraganaChar('い'), new HiraganaChar('う'), new HiraganaChar('あ')];
    const sorted = arr.sort((x, y) => x - y); // 配列の要素を数値として比較して昇順に並べる
    expect(sorted.map(o => o.char)).toStrictEqual(['あ', 'い', 'う']);
  });
});

