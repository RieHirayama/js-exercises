## 問題

15.4-10.11 では `#/` や `#/active` といった URL を利用した。
少し昔だとこのような URL は `#!/` や `#!/active` と `!` を付けることもあった (もしかしたら職場でそのようなコードを見るかもしれない)。
このような形式を当時は hashbang と呼んだ。どうしてこのようなスタイルが存在したのだろうか。

**参考**: [Twitter がページ表示時間を 5 分の 1 に高速化。どのようなテクニックを使ったのか？](https://www.publickey1.jp/blog/12/twitter51.html)

## 回答
Hashbang（#!/active）は、Ajaxを使ったSPA（Single Page Application）で以下要求から生まれた妥協案だった。

- URLを変えたい
- でもページはリロードしたくない
- かつSEO対策もしたい

※Ajax (Asynchronous JavaScript and XML):
ページをリロードせずに、サーバーと通信してデータを取得・送信する技術。

現在はpushStateがあるため、Hashbangは不要になった。

### メモ：調査での記事抜粋
https://gihyo.jp/dev/clip/01/orangenews/vol62/0005
hash-bangを含むURLはAjaxを利用するために考えられたしくみです。#以降は単なるフラグメントとして処理されるため、サーバは#より前のURLを解釈しコンテンツを出力します。そしてブラウザにてJavaScriptが#以降を解釈し、以降のパスに相当するコンテンツをAjaxにて取得しコンテンツを書き換えます。このしくみができた背景は、Ajax後のコンテンツをSEO（Search Engine Optimization、検索エンジン最適化）の観点からPermalink（固定リンク）にしたいが、一部のブラウザがURLを変更できないため、JavaScriptでフラグメントが変更できるしくみを利用しよう、という事情があります。しかもGoogleが「#!」を「?_escaped_fragment_=」に変換してクロール可能にする仕様を公開したため、FacebookやLifehacker.comをはじめ各所で使われるようになりました。

Hashbang を利用したURLは現在では「あまり使うべきではない」と言われています。
また HTML5 で pushState という機能が採用され Hashbang を使わずともブラウザヒストリを記録しつつクライアントサイドで画面を書き換えることができるようになりました。
（pushStateはブラウザの履歴を操作できる History API の一つで、今まではハッシュ (Hashbang) を書き換えることで各サイトが JavaScript を使って擬似的にそれを管理していたものが、標準 API でできるようになったということ）

以上