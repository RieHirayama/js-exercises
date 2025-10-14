## 問題

自作のスクリプトに対し script タグで integrity 属性を付けると、適切な integrity 値の場合はロードされ、そうでない場合ロードされない。このようなセキュリティ機能があるとどのような攻撃を防御できるか記述しなさい。

## 回答

### そもそもscriptタグのintegrity属性とは

外部スクリプトの内容が改ざんされていないかを検証するためのセキュリティ機能。

- integrity属性には、スクリプトファイルのハッシュ値（例: SHA-384）を指定。
- ブラウザはスクリプトをダウンロードした後、その内容のハッシュ値をintegrity属性の値と比較。
- 一致しない場合（改ざんされている場合）、スクリプトの実行を拒否する。

### SRI（Subresource Integrity）

scriptタグのintegrity属性によるこの仕組みを、SRI（Subresource Integrity）と呼ぶ。

- 外部リソース（JavaScriptやCSSなど）の内容が改ざんされていないかを検証するためのWeb標準のセキュリティ機能。
- scriptやlinkタグのintegrity属性にハッシュ値を指定し、ブラウザがダウンロードしたリソースの内容と照合。
- 一致しない場合はリソースの実行・適用を拒否。

### どのような攻撃を防御できるか

サプライチェーン攻撃(※1)や、CDN(※2)の乗っ取りによる悪意あるコードの混入を防止できる。

- (※1)サプライチェーン攻撃：　
  自分のWebサイトやサービスが直接攻撃されるのではなく、依存している外部のライブラリ・サービス・ツールなどが改ざんされ、それを通じて悪意あるコードが混入する攻撃。
- (※2)CDN（Content Delivery Network）：　
  世界中に分散配置されたサーバーを使って、Webサイトの画像・動画・JavaScriptなどのコンテンツを高速・安定して配信する仕組み。CDNは、多くのWebサイトが共通して利用するため、もしCDNの管理権限が奪われたり、CDN上のファイルが改ざんされると、世界中の多くのサイトに一斉に悪意あるコードが配信されてしまう危険がある。

## 補足

ハッシュ値の作成

### integrity用のハッシュ値を生成するには、以下のコマンドを実行。

```
$ openssl dgst -sha384 -binary ./ch15.01-03/ex03/index.js | openssl base64 -A
```

### Node.jsで生成する場合は、以下のコードを実行。

```
import crypto from "crypto";
import fs from "fs";

const filePath = "./ch15.01-03/ex03/index.js";
const fileBuffer = fs.readFileSync(filePath);
const hash = crypto.createHash("sha384").update(fileBuffer).digest("base64");
console.log(`[Integrity確認] ${filePath} のハッシュ値: ${hash}`);
```

以下コマンド実行でも可。今回はこれでやった。

```
node -e "const fs=require('fs');const c=require('crypto');const b=fs.readFileSync('./ch15.01-03/ex03/index.js');const h=c.createHash('sha384').update(b).digest('base64');console.log('sha384-'+h)"
```
