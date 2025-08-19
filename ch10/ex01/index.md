# 問題

sets.cjs、stats.cjs、index.cjs を Webpack で mode を none、developemnt、production のそれぞれでバンドルし、各結果が、index.jsに対してどの様な差異があるかを、それぞれ 1 行程度で記述しなさい。

## Webpack での各 mode でのバンドル手順

Webpack での各 mode でのバンドルは package.json のあるディレクトリで以下の手順で実行。

```
npm i -D webpack webpack-cli # Webpackインストール
# 以下それぞれ ./ch10/ex01/dist/main.jsが出力される
npx webpack --mode=none ./ch10/ex01/index.cjs -o ./ch10/ex01/dist
npx webpack --mode=development ./ch10/ex01/index.cjs -o ./ch10/ex01/dist
npx webpack --mode=production ./ch10/ex01/index.cjs -o ./ch10/ex01/dist
```

# 回答

## 実行結果

BitSetをCommonJSでexportして、none、developemnt、production のmodeでバンドル実行。
それぞれのmodeでバンドルした結果は以下のファイル参照。

- none_main.js
- developemnt_main.js
- production_main.js

## Webpackでの差異

各モードのバンドル結果（上記ファイル）をp.276上に載っているコード（自作まとめ結果）と比較。

- mode: none
  自作に対し、`modules{}` 相当が `__webpack_modules__`＋`__webpack_require__` に置き換わるだけで、構造は近い。コードはそのまま（クラス名・変数名が保持）で人が読みやすい。
- mode: development
  none と同様の構造に`eval` ラップや `sourceURL`/パスコメントが加わり、デバッグ向け情報になっている。
- mode: production
  バンドルが最小化（短い数値ID・変数名圧縮）、未使用定義の削除（NotSet/RangeSet/SingletonSetなど）などの最適化がされている。余計な改行・スペースの削除、コメントもなく、ぱっと見、人は読みにくい。

# 参考

## Webpackとは

- JavaScriptのモジュールバンドラ（module bundler）
- Webアプリを作るとき、多くのファイルにコード分割されているが、ブラウザで直接 `require` や `import` を解決するのは難しい場合が多いため、Webpackがそれらを解析・依存関係を解決して 1つのファイル（バンドルファイル）にまとめてくれる。

### modeとは

#### 1. `mode: none`

- 何の最適化もデフォルトで行わないモード。
- ソースを「そのまま」依存解決して束ねるだけ。
- 比較実験や教材で「Webpackがどんなコードを生成しているか」を見るのに使われる。
- 実運用ではあまり使わない。

#### 2. `mode: development`

- 開発時に使うモード。
- ソースマップ（元ファイルに対応付けする情報）が付き、デバッグがしやすい
- コードが可読性重視で圧縮されない
- `process.env.NODE_ENV` が `"development"` に設定される（ライブラリの挙動が変わる場合がある）

#### 3. `mode: production`

- 本番用に使うモード。
- コードが 最小化（minify）され、変数名が短くなったり改行がなくなったりする
- 未使用のコードが削除される（tree shaking）
- `process.env.NODE_ENV` が `"production"` になる（ReactやVueなどで高速化される）
- 配布サイズが小さく、ロードが速くなる
