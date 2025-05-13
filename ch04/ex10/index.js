// 配列 `["r", "i", "c", "o", "h"]` の `"o"` の要素を `delete` で削除したとき、削除後の配列の内容と `length` の値をコンソール出力

const arr = ["r", "i", "c", "o", "h"];
delete arr[3]; // "o" を削除
console.log(arr); // [ 'r', 'i', 'c', <1 empty item>, 'h' ]
console.log(arr.length); // 5