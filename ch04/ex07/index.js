// このような関数は絶対に書いてはならない。
function set42(key) {
    eval(`${key} = 42;`);
}
let hello = 0;
// helloは42になる。
set42("hello");
console.log(hello);

console.log(alert); // ReferenceError: alert is not defined

// グローバル変数の上書き
set42("globalThis.alert");
console.log(alert); // 42

// 無限ループを引き起こす　　⇒試してみたけど実行時エラー出てうまく行かない。。。
//set42("globalThis.runInfiniteLoop = () => { while(true){} }");
// globalThis.runInfiniteLoop(); // 実行すると無限ループ
