## 脆弱な理由

innerHTMLに外部入力（json.name）をそのまま埋め込みしているため、json.nameにHTMLや<script>等が含まれていればブラウザがそれを解釈して実行してしまう。

## 「XSS（クロスサイトスクリプティング）」とは

Webページに悪意あるスクリプト（JavaScriptなど）を埋め込むことで、ユーザーの情報を盗んだり、勝手な操作をさせたりする攻撃手法。
外部から入力されたデータ（例：フォームやURLパラメータ）を、エスケープせずにHTMLに埋め込むと、攻撃者が <script> タグなどを仕込むことができ、結果、ページを見たユーザーのブラウザで攻撃者のスクリプトが実行されてしまう。

## XSS が発生する data.json に書き換え

以下の挿入ではXSSは発生しなかった。

```
<script>alert('XSS')</script>
```

<script>タグはinnerHTMLで挿入しても多くのブラウザでは実行されない。
代わりに、イベント属性（例: <img onerror="alert('XSS')">）や、HTMLタグの挿入でXSSを体験できる。
以下の挿入でXSS発生できた。
```
 <img src=x onerror=\"alert('XSS')\">
```
ページを表示すると、<img src=x onerror="alert('XSS')"> がHTMLとして挿入され、画像の読み込みに失敗し、onerrorイベントが発火してalert('XSS')が表示される。
