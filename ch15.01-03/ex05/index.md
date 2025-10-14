# ロードされる速さ確認

ロードされる速さはデベロッパーツールでネットワークタブを開きキャッシュを無効化にチェックを付けてリロードすると確認できる。

## 方法

| 方法             | 内容                                                                     | 目的                         |
| ---------------- | ------------------------------------------------------------------------ | ---------------------------- |
| async="true"     | スクリプトを他の処理と並行で非同期読み込みして、読み込み完了後すぐに実行 | 外部JSが複数ある場合に効果的 |
| defer="true"     | スクリプトをHTMLの解析と並行して読み込み、DOM構築完了後に実行            | HTML構築をブロックしない     |
| DOMContentLoaded | HTML解析完了後に実行                                                     | jQueryやDOM操作を安全に行う  |
| window.load      | 画像など全リソース読み込み後に実行                                       | 遅い（今回は避ける）         |

# 結果

## 何もしないとき

### index1.html

- Hello出ない。

### index2.html

- JSよりもdiv要素の読み込みが遅いためエラーが出ている。

## script タグにasync="true"を付与

### index1.html

- Hello出るようになった。
- index1.jsのTime:3～11ms

### index2.html

- Hello出るようになった。
- index2.jsのTime:3～8ms

## 全script タグにdefer="true"を付与

### index1.html

- Hello出るようになった。
- index1.jsのTime:3～11ms

### index2.html

- Hello出るようになった。
- index2.jsのTime:3～8ms

## document.addEventListener("DOMContentLoaded", () => {})で囲んだ

### index1.html

- index1.jsのTime:2～5ms

### index2.html

- asyncだとHelloでなくなった。deferに付与。
- index2.jsのTime:3～7ms
