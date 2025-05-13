// 値が数値のプロパティを持つオブジェクトを引数に取り、偶数の値を持つプロパティだけを残した新しいオブジェクトを返す関数
// ただし、元のオブジェクトは変更しないこと。

export function f(obj) {
  // 新しいオブジェクトを作成する
  const newObj = {};

  // オブジェクトのプロパティをループする
  for (const key in obj) {
    // プロパティの値が数値で、偶数の場合
    if (typeof obj[key] === 'number' && obj[key] % 2 === 0) {
      // 新しいオブジェクトに追加する
      newObj[key] = obj[key];
    }
  }

  return newObj;
}

