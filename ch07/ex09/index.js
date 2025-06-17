const s = "𠮷野家";
console.log(s[0]); // "𠮷"じゃない
console.log(s.length); // 4

// 出力結果
// �（”𠮷”じゃない） ※�は置換文字（U+FFFD）というもの。不正な文字や解釈不能なバイト列の代替表示
// 4

const emoji = "👨‍👨‍👧‍👧";
console.log(emoji[0]); // "👨"じゃない
console.log(emoji.length); // 11

// 出力結果
// �（”👨”じゃない）
// 11

// 文字列の各文字をUTF-16コードで表示する関数
function getUtf16CodeUnits(str) {
  const result = [];
  for (let i = 0; i < str.length; i++) {
    result.push(str.charCodeAt(i).toString(16).padStart(4, '0'));
  }
  return result;
}

console.log("𠮷野家:", getUtf16CodeUnits("𠮷野家"));
// 𠮷野家: [ 'd842', 'dfb7', '91ce', '5bb6' ]

console.log("👨‍👨‍👧‍👧:", getUtf16CodeUnits("👨‍👨‍👧‍👧"));
// 👨‍👨‍👧‍👧: [
//   'd83d', 'dc68',
//   '200d', 'd83d',
//   'dc68', '200d',
//   'd83d', 'dc67',
//   '200d', 'd83d',
//   'dc67'
// ]


const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });
const segments1 = [...segmenter.segment("𠮷野家")];
const segments2 = [...segmenter.segment("👨‍👨‍👧‍👧")];

console.log(segments1[0].segment);
console.log(segments2[0].segment);

// 出力結果
// 𠮷
// 👨‍👨‍👧‍👧


// 構成から絵文字１つずつ抜いていくと・・・
// 👨‍👨‍👧‍👧
// 👨‍👨‍👧
// 👨‍👨
// 👨