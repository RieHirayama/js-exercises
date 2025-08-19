# 問題

CommonJS と ES Module 以外の JavaScript のモジュール方式名を調べて記述しなさい

# 回答

## AMD (Asynchronous Module Definition)

- ブラウザ向けに考案された方式。
- `define` 関数でモジュールを定義し、非同期に依存関係をロードする。

## UMD (Universal Module Definition)

- AMD と CommonJS の両方に対応させるための折衷的な方式。
- ライブラリを「Node.js でもブラウザでも」動かすために用いられた。

## SystemJS (System.register 方式)

- ES Module の仕様が固まる前後に作られたローダー規格。
- `System.register` という形式でモジュールを記述し、動的に読み込む。
- Babel や TypeScript で ESM をトランスパイルするときに出力先として選ばれることもあった。

## IIFE / 名前空間パターン

- そもそもモジュール機能がなかった時代に使われた「即時関数（Immediately Invoked Function Expression）」や「グローバル名前空間オブジェクト」。
- 最も古典的なモジュール擬似手法。

## CommonJS

- Node.js が標準採用したモジュール方式。
- サーバーサイド JS の実行環境で必要だったため考案された。
- 「同期的に require してモジュールを読み込む」のが特徴。

## ES Modules (ECMAScript Modules, ESM)

- ECMAScript2015 (ES6)で標準化されたモジュール方式。（import / export）
- 現在はブラウザでもNode.jsでも標準として使える。
- 「静的解析が可能」な設計になっており、最適化（ツリーシェイキング等）がやりやすい。
