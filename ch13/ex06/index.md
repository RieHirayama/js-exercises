# 問題

jQuery Deferred について調べ Promise との関係性について説明しなさい。

# 回答

## jQuery Deferred

- jQuery 1.5（2011年頃）で導入された「非同期処理の結果をあとで受け取る仕組み」。
- `.done()`, `.fail()`, `.always()` などのメソッドを使って、非同期処理が成功したとき／失敗したときの処理を登録できる。
- つまり「Promise ライクな仕組み」を jQuery 独自に提供していた。

## Promise との関係性

- ECMAScript（JavaScript 標準仕様）に Promiseが正式採用されたのは ES2015（ES6）。
- jQuery Deferred はそれ以前に「同じようなことをやる仕組み」として普及した

## まとめ

- jQuery DeferredはPromiseのような非同期処理管理オブジェクト。
- ただし標準化されておらず、チェーン性や互換性に違いがある。
- 現代では Promiseとasync/awaitを使うのが標準。
- Deferred は「Promise の先祖のような存在」と言える。
- 古い jQuery プロジェクトではまだ見かけることがあるが、新規開発では使う必要はない。
