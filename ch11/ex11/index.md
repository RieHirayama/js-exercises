# 問題

コードを実行すると以下の事実に気付くだろう:

- costOfLength が負の値を返すことがある (`"Hello".length` を実行すると時が巻き戻るのだろうか?)
- costOfLength の引数の値を大きくすれば大きくする程結果が小さくなる (`"Hello".length` を実行すればする程速くなるのだろうか?)

どうやら何かがおかしい。どうしてこのような結果になるか調べて説明しなさい。

# 回答

このコードで起きている “怪現象” は、マイクロベンチの落とし穴。

1. 測定誤差の差し引きで「負」になる（ノイズ＋量子化＋差の拡大）
   「length が負の時間で実行された」のではなく、誤差どうしの差が負になっただけ。
2. JIT 最適化（定数畳み込み／ループ外だし／死コード消去）
   `costOfLengthPlusLoop` が 実質「空ループかそれに近いもの」になり、`costOfLoop`とほぼ同じ（あるいは運悪くそれより短い/長い）時間になり、この差がノイズで揺れて 負も出た。
3. N を大きくすると「1回あたりが速くなる」理由
   N が大きいほど 両者とも最適化され尽くして同じになりやすい
4. performance.now() の分解能とオーバーヘッドの支配
   1回の `str.length` は 極めて短い（ナノ秒〜数十ナノ秒級）が、これを ミリ秒〜マイクロ秒分解能の `performance.now()` で測り、しかも 2回の測定の差を取ると、測定誤差が支配的になる。
   また、 `performance.now()` 自体の呼び出しオーバーヘッドも無視できない。

# 結果

console.log(costOfLength(100));
console.log(costOfLength(1000));
console.log(costOfLength(10000));
console.log(costOfLength(100000));
console.log(costOfLength(1000000));
console.log(costOfLength(10000000));
console.log(costOfLength(100000000));
console.log(costOfLength(200000000));

PS C:\JS_training\js-exercises> node .\ch11\ex11\index.js
0.0007629999999999982
-0.0000010000000000012222
-0.000026359999999999673
0.0000015639999999999788
0.0000029495999999999967
3.830000000000666e-9
4.562999999999917e-9
9.154000000000125e-9
