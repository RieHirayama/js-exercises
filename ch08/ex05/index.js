export function sequenceToObject(...values) {
  try {
    if (values.length % 2 !== 0) {
        throw new Error("引数の数が偶数ではありません");
    }

    const result = {};

    for (let i = 0; i < values.length; i += 2) {
        const key = values[i];
        const val = values[i + 1];

        if (typeof key !== "string") {
        throw new Error(`奇数番目の引数が文字列ではありません(${i} 番目：${key})`);
        }

        result[key] = val;
    }

    return result;
  } catch (e) {
    console.error("sequenceToObject エラー:", e.message);
    return null;
  }
}


// 動作確認
console.log(sequenceToObject("a", 1, "b", 2));
// { a: 1, b: 2 }

const args = ["x", 10, "y", 20];
console.log(sequenceToObject(...args));
// { x: 10, y: 20 }

console.log(sequenceToObject("a", 1, "b"));
// sequenceToObject エラー: 引数の数が偶数ではありません
// null

console.log(sequenceToObject(123, "value", "b", 2));
// sequenceToObject エラー: 奇数番目の引数が文字列ではありません(0 番目：123)
// null
