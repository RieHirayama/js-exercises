# Node で debugger 文を使ってデバッグする方法

- デバッグしたい箇所に debugger 文を挿入
  `debugger;`

- Node.js をデバッグモードで起動
  `node inspect index.js`

- 以下のようにプロンプトが表示される

```
PS C:\JS_training\js-exercises> node inspect .\ch05\ex11\index.js
< Debugger listening on ws://127.0.0.1:9229/aee58380-7007-41d5-b071-291f59bf4cf4
< For help, see: https://nodejs.org/en/docs/inspector
<
connecting to 127.0.0.1:9229 ... ok
< Debugger attached.
<
Break on start in ch05\ex11\index.js:1
> 1 function add(a, b) {
  2     const result = a + b;
  3     debugger;
debug>
```

- デバッグのコマンドを使ってデバッグする

  - `c`で次のブレイクポイントに飛ぶ

  ```
  debug> c
  break in ch05\ex11\index.js:3
  1 function add(a, b) {
  2     const result = a + b;
  > 3     debugger;
  4     return result;
  5 }
  debug>
  ```

  - `n`で次の行に飛ぶ(ステップオーバー)　※`s`で関数の中に入る（ステップイン）

  ```
  debug> n
  break in ch05\ex11\index.js:4
  2     const result = a + b;
  3     debugger;
  > 4     return result;
  5 }
  6
  debug>
  ```

  - `o`で関数の実行を終了して呼び出し元に戻る（ステップアウト）

  - `Ctrl+D`でデバッグ終了

- Webブラウザを使っている場合は開発者ツールのコンソールを開いておくと、debugger文がブレイクポイントになる。

- debugger 文は、デバッグが終了したら削除するかコメントアウトするのが一般的
