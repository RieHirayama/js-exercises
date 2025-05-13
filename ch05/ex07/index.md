# 問題

以下のプログラムの出力を予想し、実際の実行結果を確認しなさい。

```
function f() {
    try {
        return true;
    } finally {
        return false;
    }
}

console.log(f());
```

# 回答

実行結果： false

理由：finallyブロックは、tryやcatchブロックの後に必ず実行される。
finallyブロック内にreturn false;があるため、最終的に戻り値はfalseになる。
