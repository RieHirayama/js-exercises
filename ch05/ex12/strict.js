// 非 strict モードでは動作するが strict モードでは動作しないプログラム

function f() {    
    // 変数を宣言せずに代入する
    x = 10; // strict モードではエラーになる。非 strict モードではグローバル変数xが作成される
    console.log(x);
}
f();

/* 変数を宣言してないよとエラーになる
PS C:\JS_training\js-exercises> node .\ch05\ex12\strict.js      
file:///C:/JS_training/js-exercises/ch05/ex12/strict.js:5
    x = 10; // strict モードではエラーになる。非 strict モードではグローバル変数xが作成される
      ^

ReferenceError: x is not defined
    at f (file:///C:/JS_training/js-exercises/ch05/ex12/strict.js:5:7)
    at file:///C:/JS_training/js-exercises/ch05/ex12/strict.js:8:1
    at ModuleJob.run (node:internal/modules/esm/module_job:218:25)
    at async ModuleLoader.import (node:internal/modules/esm/loader:329:24)
    at async loadESM (node:internal/process/esm_loader:28:7)
    at async handleMainPromise (node:internal/modules/run_main:113:12)

Node.js v20.11.1
*/