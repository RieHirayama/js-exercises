# 問題

古い JavaScript のコードでは `undefined` と比較を行う際に:

```js
if (foo === undefined) { ... }
```

ではなく以下のように書かれたコードを見ることがある (注: `void 0` は `undefined` を返す)。

```js
if (foo === void 0) { ... }
```

これにはどのような理由があるか、また今ではこのような書き方をしないのは何故か調べて回答しなさい。

# 回答

voidは１つの式を取って、常にundefinedを返す演算子

```js
//すべてundefinedが帰ってくる
void 0;
void 0;
void 99;
void "wow";
void {};
```

このように、voidはundefinedの代わりとして使える
`undefined`の代わりに、`void 0`を使ったほうがいい理由：undefined は単なるグローバル変数でしかないから
自分の意思でundefinedを自由に書き換えることができる。
つまり、undefinedは常にundefinedである保証はどこにもないから、undefinedを使うのを避けるべき。
対して、void演算子を使えば、常に本当のundefinedを返すので、安全。

しかし今ではなぜこのような書き方をしないか？
現在では使わない理由

- undefined が書き換え不可能になった（ES5以降）
- undefined を直接使用する方が可読性が高い。
- 現在の JavaScript 環境（ブラウザや Node.js）では、undefined の安全性が保証されている。
