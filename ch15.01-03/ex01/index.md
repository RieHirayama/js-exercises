## 質問

index.html ファイル内の script タグから `type="module"` 属性を削除した場合、期待通り動作させるにはどうすべきか答えなさい。

## 回答

- `<script type="module">` は 自動的に deferがついているのと同じように実行（HTML解析後に実行）される。
  これを外すと、`<head>` 内の通常スクリプトは 直ちに実行され、まだ `<form>`/`#todo-list` が存在せず `querySelector(...)` が `null` になって壊れる。
- 以下のような対処をすると良い。
  - `defer`をつける（`<script src="/ch15.01-03/ex01/index.js" defer></script>` にする）
  - JS実行を最後に書く（`<body>` 終了直前に `<script src="..."></script>` を移動する）
