## 問題 8.4 🖋️

以下の入れ子の関数とアロー関数のコード実行結果を予想してから実行し、結果を説明しなさい。

```js
const obj = {
  om: function () {
    const nest = {
      nm: function () {
        console.log(this === obj, this === nest);
      },
      arrow: () => {
        console.log(this === obj, this === nest);
      },
    };
    nest.nm();
    nest.arrow();
  },
};
obj.om();
```

### 回答

#### 予想

```
false true
true false
```

通常の関数ではthisは呼び出し元になり、アロー関数は呼び出し元ではなく、外側のthisを継承する。  
nest.nmは通常の関数であるため、thisは呼び出し元であるnestを指す。  
nest.arrowはアロー関数であるため、thisは外側のom関数スコープでのthisを継承するので、objを指す。

#### 実際の出力

以下が出力された

```
false true
true false
```
