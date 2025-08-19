# 問題

JavaScript/TypeScript の有名な日付操作の OSS リポジトリである[date-fns](https://github.com/date-fns/date-fns)、[Luxon](https://github.com/moment/luxon)、[Day.js](https://github.com/iamkun/dayjs)のそれぞれが、src ディレクトリ以下がどのようなまとまりでモジュール分割されているか分析して、それぞれ 2、3 段落程度で記述しなさい。

# 回答

## date-fns

### date-fnsについて

date-fnsは「関数の道具箱」型の設計で、format や addDays といった1機能＝1関数を個別に使うスタイル。各関数は副作用がなく、必要な関数だけをimportできるためツリーシェイクと相性が良いのが長所。

### モジュール分割分析

date-fns の `src` は「1 機能＝1 モジュール」が基本。
`src/format/index.ts` のように各関数がディレクトリを持って`index.ts`を公開している。
関数の実装は横断ユーティリティ群 `src/_lib/`に細かく分離され、個々の関数から必要なものだけを import する。これにより “必要な関数だけを持ってくる” という設計とツリーシェイキングの相性が良くなっている。
`src/fp/` には同名関数の“関数型（カリー化）版”がまとまっており、用途別に通常版と FP 版を明確に分けるディレクトリ設計。

## Luxon

### Luxonについて

Luxonは Moment.js の組織（moment/）で開発されているライブラリで、DateTime・Duration・Intervalといった型（クラス）を中心に据えたAPIが特徴。不変（immutable）・チェーン可能・曖昧さの少ない表現を重視し、日時の作成・演算・整形を同一オブジェクト流で扱える。

### モジュール分割分析

Luxon は型ごとにトップレベルのソースを分ける構成で、`src/datetime.js`（DateTime）、`src/duration.js`（Duration）、`src/interval.js`（Interval）、`src/info.js`、`src/errors.js` といった“クラス（型）単位”のファイルが並んでいる。再エクスポートの集約には `src/luxon.js` が使われる。
内部実装の共通処理は `src/impl/` にまとめ、タイムゾーン関連は `src/zones/` に分離されている。

## Day.js

### Day.jsについて

Day.jsは「2KB級の極小コア」を掲げる軽量ライブラリで、Moment.jsに近い書き心地を維持しつつ、不変（immutable）・チェーン可能な操作を提供。学習コストが低く、dayjs().add(1, 'day').format('YYYY-MM-DD') など直感的なAPIで素早く使い始められるのが強み。

### モジュール分割分析

Day.js は「極小コア + プラグイン + ロケール」の三層構造。`src` にはコア（`index.js` ほか、`constant`/`utils` といった基盤）に加えて、各ロケールが `src/locale/<言語>.js` として独立ファイルで置かれ、拡張機能は `src/plugin/<プラグイン名>.js` という 1 プラグイン＝1 ファイルのモジュールで提供されている。
