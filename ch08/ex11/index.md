## 問題 8.11

組み込み関数と自作関数の `toString()` の出力内容を確認しなさい

### 回答

#### 自作関数

```
function fn(a, b) {
return a + b;
}

console.log(fn.toString());
```

- 自作関数のtoString()の出力内容

```
 function fn(a, b) {
 return a + b;
 }
```

#### 組み込み関数

```
console.log(Array.prototype.map.toString());
console.log(Array.prototype.push.toString());
console.log(Math.max.toString());
console.log(String.prototype.toString.toString())
```

- 組み込み関数のtoString()の出力内容

```
 function map() { [native code] }
 function push() { [native code] }
 function max() { [native code] }
 function toString() { [native code] }
```
