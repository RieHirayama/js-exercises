# 問題

以下のプログラムの出力を予想し、実際の実行結果を確認しなさい。

```
let x = 0;

for(let i = 1; i <= 5; i++) {
    x = i;
    try {
        throw Error();
    } catch {
        break;
    } finally {
        continue;
    }
}

console.log(x);
```

# 回答

実行結果： 5
理由：finallyブロック内のcontinueがcatchブロック内のbreakを無効化して、ループの次の反復に進むため、forループの最後の条件i=5まで進み、結果が5になる。
