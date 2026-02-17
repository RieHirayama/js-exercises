## scriptsの `"format": "prettier . --write",` と `"format": "prettier --write ."` の書き方の違い

実質的な違いは無し。  
Prettierはこの順序に依存しない。  
PrettierのCLI構文

```
prettier [options] [file/dir/glob]
```

ちなみに、ESLintも実質的な違いは無し  
ESLint の基本構文

```
eslint [options] [file|dir|glob ...]
```

## ESLintの `--max-warnings=0` オプションの意味

warning を 0 個までしか許さないという意味。  
warning = error と同じ扱いになる。

## exlintの初期化オプション使ってみた

> npx eslint --init
>
> > You can also run this command directly using 'npm init @eslint/config@latest'.  
> > Need to install the following packages:  
> > @eslint/create-config@1.11.0  
> > Ok to proceed? (y) y

> ch17@1.0.0 npx  
> create-config

@eslint/create-config: v1.11.0

√ What do you want to lint? · javascript  
√ How would you like to use ESLint? · problems  
√ What type of modules does your project use? · esm  
√ Which framework does your project use? · none  
√ Does your project use TypeScript? · No / Yes  
√ Where does your code run? · node  
i The config that you've selected requires the following dependencies:

eslint, @eslint/js, globals  
√ Would you like to install them now? · No / Yes  
√ Which package manager do you want to use? · npm  
☕️Installing...  
・・・

found 0 vulnerabilities  
√ Successfully created  
js-exercises\ch17\eslint.config.js file.

## .eslintrc.cjsとeslint.config.jsは違う役割？

同じ役割だが設定方式が違う。  
ESLint v9以降は `eslint.config.js` が標準。  
※役割：ESLintのルールや環境設定を書くファイル

### `.eslintrc.cjs`

- 旧方式(eslintrc方式)
- extendsベースで積み重ねる
- レガシー

### `eslint.config.js`

- 新方式(Flat Config)
- 配列で設定を並べる「フラット構造」
- 推奨（ESLint v9以降） |

## lint実行してみたらエラー

valid-jsdoc が見つからないというエラーでる。  
ESLint 9 では valid-jsdoc と require-jsdoc ルールが削除されているが、eslint-config-google 側（Googleスタイルの共有設定）が その削除済みルールを参照していて、ESLintが設定読込の時点で落ちている状況。  
ESLint v9のまま、Google config を使わないように修正。  
→eslint.config.js から `...compat.extends("google"),` をコメントアウト  
Google Style Guideに寄せるのは Prettierの設定（.prettierrc）でやる。

### 今回の.prettierrcの設定

- "printWidth": 80  
  1行の最大文字数を 80 文字に制限する。  
  Google Style Guide では 80 文字推奨。
- "tabWidth": 2  
  インデントを 2 スペースにする。  
  Google JS Style Guideは2スペースインデント。
- "semi": true  
  文末に必ずセミコロンを付ける。  
  Googleはセミコロン必須。
- "singleQuote": true  
  文字列をシングルクォートで統一する。  
  Googleはダブルクォートを推奨しているので、ここはGoogleとは違う。  
  Prettierはデフォルトがダブルなので、今回ダブルにしている。
- "trailingComma": "all"  
  配列やオブジェクトの最後にもカンマを付ける。  
  Google Style Guideは「許可」している。
- "arrowParens": "always"  
  アロー関数の引数が1つでも必ず括弧を付ける。  
  Google準拠の書き方になる。
