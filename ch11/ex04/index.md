# 問題

型付き配列と通常の配列で行列の乗算の速度を比較してみなさい。また実行する前にどのような結果になるか予測しなさい。

# 回答

## 予想

- JS の `Array<number>` も JIT 最適化で十分速いので、環境によっては ほぼ同等かわずかにどちらかが速い程度の差になる。
- TypedArray（Float64Array）は連続メモリで安定したスループットが出やすいので、規模が大きくなると わずかに有利になる可能性がある。

## 結果

### const [N, K, M] = [100, 200, 300]のとき、

- Float64Array
  - arrayMultiply: 641.8471
  - typedArrayMultiply: 629.8254999999999
- 再度実施
  - arrayMultiply: 628.6492999999998
  - typedArrayMultiply: 614.3142
- 再度実施
  - arrayMultiply: 627.9824999999998 ms
  - typedArrayMultiply: 605.5603999999998 ms
- Float32Array
  - arrayMultiply: 634.4254000000001
  - typedArrayMultiply: 675.9445000000001
- 再度実施
  - arrayMultiply: 594.0309
  - typedArrayMultiply: 578.1535000000001

### const [N, K, M] = [200, 300, 400]のとき、

- Float64Array
  - arrayMultiply: 2512.6402000000007
  - typedArrayMultiply: 2477.075100000001
- 再度実施
  - arrayMultiply: 2487.4855000000007 ms
  - typedArrayMultiply: 2480.4606999999996 ms
- Float32Array
  - arrayMultiply: 2465.7377000000006 ms
  - typedArrayMultiply: 2514.1737999999996 ms
- 再度実施
  - arrayMultiply: 2523.2163 ms
  - typedArrayMultiply: 2749.1315000000013 ms

### const [N, K, M] = [10, 20, 30]のとき、

- Float64Array
  - arrayMultiply: 0.5086000000000013
  - typedArrayMultiply: 0.5756999999999977
- 再度実施
  - arrayMultiply: 0.5030999999999999 ms
  - typedArrayMultiply: 0.5840999999999994 ms
- Float32Array
  - arrayMultiply: 0.7495999999999974 ms
  - typedArrayMultiply: 0.6585999999999999 ms
- 再度実施
  - arrayMultiply: 0.4431999999999974 ms
  - typedArrayMultiply: 0.6467000000000027 ms

## 結論

わずかな差（数十ms）の場合が多い。
環境依存が大きいのか、どちらが早いというのも条件により一意ではなく、ぶれる。
