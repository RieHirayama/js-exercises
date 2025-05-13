// 非 strict モードでは動作するが strict モードでは動作しないプログラム

function f() {    
    // 変数を宣言せずに代入する
    x = 10; // strict モードではエラーになる。非 strict モードではグローバル変数xが作成される
    console.log(x);
}
f();

/* 普通に実行できる
PS C:\JS_training\js-exercises> node .\ch05\ex12\non-strict.cjs 
10 
*/