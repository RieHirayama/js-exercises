# 問題

`eval` は大変危険な関数である。以下の関数 `set42` は与えられた文字列の変数に `42` を代入する。

```js
// このような関数は絶対に書いてはならない。
function set42(key) {
  eval(`${key} = 42;`);
}

// 例:
set42("hello");
console.log(hello); // 42
```

`set42` に意図せぬ動作 (例: システムに負荷を与える、セキュリティの問題となる挙動を取る) を行わさせるにはどのような引数を与えればいいか答えなさい。
ただし実行時エラーが発生しない引数としなさい。

# 回答

グローバル変数の上書き

通常Node.js環境だと存在しないalert関数をコンソール出力しようとするとReferenceErrorになる
console.log(alert); // ReferenceError: alert is not defined

しかし、evalでグローバル変数の上書きを行いalert関数の上書きをすると、数字で置き換えられる。
set42("globalThis.alert");
console.log(alert); // 42

※globalThis は、JavaScript におけるグローバルオブジェクトを参照するための標準的な方法。ECMAScript 2020（ES11）で導入された。

グローバルオブジェクトとは？
グローバルオブジェクトは、JavaScript の実行環境（ブラウザや Node.js）で常に存在するオブジェクトで、グローバルスコープの変数や関数を格納している。
