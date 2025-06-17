# 問題

7.10 で作成した動的配列の push の平均時間計算量を説明しなさい。またその結果を用いて以下の関数 `copyA` と `copyB` に対し、`array.length` を `n` とした時の時間計算量を求めなさい。

```
function copyA(array) {
  const result = Array(array.length);
  for (let i = 0; i < array.length; i++) {
    result[i] = array[i];
  }
  return result;
}

// NOTE: copyB よりも copyA の方が効率的に見えるが計算量の観点ではどうだろうか
function copyB(array) {
  const result = [];
  for (const v of array) {
    result.push(v);
  }
  return result;
}

```

ヒント: `push` を $`n`$ 回呼び出したとき、7.10 の実装では配列を倍々にしていくので再配置は $`log_2 n`$ 回発生する。各再配置で要素のコピーは $`1, 2, 4, 8, ..., 2^{log_2 n}`$ 回発生する。再配置の際にコピー回数の総和は $`2^0 + 2^1 + 2^2 + ... + 2^{log_2 n} = ...`$ (等比数列の和の公式を思い出すこと)。この値を $`n`$ で割れば各 `push` の平均時間計算量が求められる。

**参考**: [計算量](https://atcoder.jp/contests/apg4b/tasks/APG4b_w)

# 回答

## 各 `push` の平均時間計算量

再配置の際のコピー回数の総和／n  
$`{(2^0 + 2^1 + 2^2 + ... + 2^{log_2 n})}/n = {(2^{(log_2 n)+1}-1)}/n`$  
分子{(2^{(log_2 n)+1}-1)}={(2^(log_2 n)\*2^1)-1}=2n-1
nが十分大きい場合は(ほぼ2n)/n=2
つまり、各 `push` の平均時間計算量はO(1)。

## copyAの時間計算量

O(n)
固定長配列に O(1) コピーを n 回

- `Array(n)` の生成：O(n)
- 要素のコピー：O(n)　// O(1) \* n 回

## copyBの時間計算量

O(n)
動的配列で push（平均 O(1)）を n 回

## 結論

どちらも時間計算量は O(n)
