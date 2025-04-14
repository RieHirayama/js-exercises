// Number() 関数で true, 1234, "text" をそれぞれ数値変換しコンソール出力
console.log(Number(true)); // 1
console.log(Number(1234)); // 1234
console.log(Number("text")); // NaN、文字が数値として解釈できない場合は NaN を返す

// Boolean() 関数で 1234, 0 を真偽値変換しコンソール出力
console.log(Boolean(1234)); // true、0とかNaNとか空文字列とかのfalseの条件以外はtrue
console.log(Boolean(0)); // false

// String() 関数で true, 1234 を文字列変換しコンソール出力
console.log(String(true)); // "true"
console.log(String(1234)); // "1234"

// parseInt() で "12,742 km：地球の直径"を数値変換しコンソール出力
console.log(parseInt("12,742 km：地球の直径")); // 12、できるだけ多くの数値文字列を解釈しその後の文字を無視。カンマは解釈できない

// parseFloat() で "1.618：黄金比" を変換してコンソール出力
console.log(parseFloat("1.618：黄金比")); // 1.618、できるだけ多くの数値文字列を解釈しその後の文字を無視