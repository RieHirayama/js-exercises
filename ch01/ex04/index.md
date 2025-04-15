## それぞれの場合の予想と確認結果

### 最初に「file:///C:/JS_training/js-exercises/ch01/ex04/index.html」開いてみた。
予想：{answer:42},{answer:0} の２つが出る
結果：２個ともObjectと出て、answer:0

### ↓ページ更新してみた（開発者ツールを開いた状態のタブで HTML を開く場合）
結果：期待通りの{answer:42},{answer:0} の２つが出る。でもanswer:0

### ↓開発者ツール閉じて、更新して、再度開発者ツール開く（HTML を開いた状態のタブで開発者ツールを開く場合）
結果：２個ともObjectと出て、answer:0

## 常に期待した結果を得るためのコード修正
console.log(life)はlifeオブジェクトの「参照」を出力するが、参照を持ってるだけなので、後で中身が変われば表示内容も変わってしまう。
そのため、オブジェクト全体ではなく、中身の値だけを出力するように指定してあげる。

変更前：console.log(life); // これだけでは参照を渡しちゃってる
変更後：console.log(life.answer); // この時の中身の値を出力する






---以下、色々迷った経緯を残しとく-----
たぶん処理のタイミングの差だと思い、「JS HTMLファイル内の処理でページ表示後にする」でググる。
以下のようにすると良いらしい。
window.onload = function() {
   // 実行したい処理
   alert('ページの読み込みが完了したよ！');
}

貼り付け元  <https://www.nishishi.com/javascript-tips/onload-page.html> 

以下のように修正。
<!DOCTYPE html>
<html>
  <body>
    <script>
        window.onload = function () {
            let life = { answer: 42 };
            console.log(life);
            life.answer = 0;
            console.log(life);
        }
    </script>
  </body>
</html>

結果：変わらない。

再度今回の差はなんで出るのか考える。
- 開発者ツールを開いた状態でページを読み込むと、`console.log` の出力がリアルタイムで表示される。
- 開発者ツールを後から開いた場合、`console.log` の出力はすでに完了しているため、コンソールには何も表示されない。

途中にブレイクポイント入れる。↓試してみたがダメだった。。
   let life = { answer: 42 };
   console.log(life);
   debugger; // ここで実行が一時停止
   life.answer = 0;
   console.log(life);


以下の書き方をしてみる。
document.addEventListener("DOMContentLoaded", function() {
   // 実行したい処理
});

貼り付け元  <https://www.nishishi.com/javascript-tips/onload-page.html> 

結果：だめだった。。


以下参考にdefer入れてみた。
https://qiita.com/phanect/items/82c85ea4b8f9c373d684

<script defer>

結果：だめだった。。

以下でうまく行った。
console.log(life)はlifeオブジェクトの「参照」を出力するが、参照を持ってるだけなので、後で中身が変われば表示内容も変わってしまう。
そのため、オブジェクト全体ではなく、中身の値だけを出力するように指定してあげる。

変更前：console.log(life); // これだけでは参照を渡しちゃってる
変更後：console.log(life.answer); // この時の中身の値を出力する
