// Nodeで動かす場合は.mjs拡張子にするが、package.jsonに"type":"module"を入れているので、.jsを使える。
// 直接 import：デフォルト＋名前変更付きインポート
import dbl, { Dog as DogClass } from "./utils.js";

// 再エクスポート経由の import（bridge.js から）
import { times2 as t2, Puppy } from "./bridge.js";

// 動作確認
console.log("dbl(5):", dbl(5));
const a = new DogClass("ポチ");
console.log(a.bark());

console.log("t2(7):", t2(7));
const b = new Puppy("ハチ");
console.log(b.bark());

// 出力結果
// dbl(5): 10
// ポチ がワンワン！
// t2(7): 14
// ハチ がワンワン！