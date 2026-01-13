# 問題16.5 回答

## 1. 単語調査

- 標準入力 (stdin): プログラムが外部からデータを受け取るための入口。
- 標準出力 (stdout): プログラムが処理結果を出力するための出口。
- 標準エラー出力 (stderr): エラー出力のためのストリーム。標準出力とは別のストリームなので、エラーと通常出力を分けて扱える。
- リダイレクト（<）: stdin/stdout/stderr の入出力先をファイルなどに切り替えること。
  ```
  command < filename
  ```
- パイプ（|）: あるコマンドの stdout を次のコマンドの stdin へ渡す仕組み。
  ```
  command1 | command2
  ```

## 2. 実験 (予測と結果)

### `node cat.mjs`

- 予測: 入力待ちになり、入力した内容がそのまま出力される。
- 結果: 入力待ちになり、入力した内容がそのまま出力された。終了するには Ctrl+C 。

### `echo FOO | node cat.mjs`

- 予測: 標準出力に「FOO」を出力し、この左のコマンドの標準出力を右のコマンドの標準入力に接続するため、`FOO` がそのまま出力される。
- 実験: 入力待ちにならず、`FOO` が出力された。

### `node cat.mjs > output.txt`

- 予測: 入力待ちになり、入力した内容が `output.txt` に保存される。
- 実験: 入力待ちになり、入力した内容が終了後に `output.txt` に保存された。終了は Ctrl+C 。

### `node cat.mjs file`

- 予測: `file` の内容が出力される。
- 実験: `file` の内容が出力された。

### `node cat.mjs file > output.txt`

- 予測: `file` の内容が `output.txt` に保存される。
- 実験: `file` の内容が `output.txt` に保存された。

### `node cat.mjs invalid-file > output.txt`

- 予測: stderr にエラーが出力され、`output.txt` は空になる。
- 実験: ENOENT エラーが stderr に表示され、`output.txt` は空だった。

### `node cat.mjs invalid-file 2> error.txt`

- 予測: エラーが `error.txt` に保存される。
- 実験: `error.txt` にエラーが保存された。
