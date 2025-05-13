// 非 strict モードでは動作するが strict モードでは動作しないプログラムをstrict モードで実行できるようにする

function f() {
    // 変数を宣言して代入する
    const x = 10;
    console.log(x);
}
f();

/* 変数を宣言したらstrictモードでも実行可能
PS C:\JS_training\js-exercises> node .\ch05\ex12\strict-fixed.js
10
*/