# 問題

問題 13.1 で非同期処理について学んだあなたは「時間のかかる同期関数があるならば、非同期関数に変換して適宜 `await` すればいいのではないか」と思いついた。

それでは以下のコードを実行すると何が出力されるか予想し実際に確認しなさい。
また「[マイクロタスク](https://developer.mozilla.org/ja/docs/Web/API/HTML_DOM_API/Microtask_guide)」について調査し、この用語を用いて理由を説明しなさい。

# 回答

出力結果：
「A」と「B」が交互に出続け、`setTimeout(..., 1000)` の「Hello, world!」は全然出力されない。

- `await Promise.resolve({})` はすぐ解決する Promiseを `await` しているので、次の処理はマイクロタスクとして実行される。
- イベントループは 「現在のマクロタスクが終わるたびに、マイクロタスクを空になるまで先に全部処理」します。
- `longA`/`longB` はループのたびに新しいマイクロタスクを追加するため、マイクロタスクのキューが永遠に空にならず、タイマー（`setTimeout`＝マクロタスク）に進めない。

## マクロタスクとマイクロタスク

- マクロタスク（Task）
  タスクキューに入れられ、1つずつ処理される。
  代表例: `setTimeout`, `setInterval`, `setImmediate`(Node), I/O
- マイクロタスク（Microtask）
  現在のマクロタスク終了後すぐに、次のマクロタスクに移る前に必ず全部処理される。
  代表例: `Promise.then`, `catch`, `finally`, `queueMicrotask`
