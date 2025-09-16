# 問題

以下の各関数を実行すると何が出力されるか予想し実際に確認しなさい。
またその理由を 2、3 行のテキスト、図のいずれかまたは両方で説明しなさい。テキスト・図は問題 13.2 を参考にしなさい。
`i4` に関しては、コードを修正して `v` の最終結果が 10 となるコードを実装しなさい。

```js
async function i1() {
  // NOTE: any で1つ Promise が解決された時に他の Promise はどうなるだろうか
  let v = 0;

  v = await Promise.any([
    wait1().then(() => 42),
    wait2()
      .then(() => (v = 100))
      .then(() => 0),
  ]);

  log(v);
  await wait2();
  log(v);
}

async function i2() {
  const v = await Promise.all([
    wait3().then(() => {
      logA();
      return "A";
    }),
    wait2().then(() => {
      logB();
      return "B";
    }),
    wait1().then(() => {
      logC();
      return "C";
    }),
  ]);
  log(v);
}

async function i3() {
  // NOTE: all で引数の1つが失敗すると他の Promise はどうなるだろうか
  let v = 42;
  try {
    await Promise.all([
      wait3().then(() => {
        v = 0;
        errX();
      }),
      wait2().then(() => {
        logB();
        return "B";
      }),
      wait1().then(() => {
        errY();
      }),
    ]);
  } catch (e) {
    log(e.message);
    log(v);
    await wait3();
    log(v);
  }
}

async function i4() {
  // NOTE: 複数の非同期処理が1つの変数に対し書き込みを行う場合、読み込みと書き込みの間に await が入るとどうなるだろうか
  let v = 0;

  const p1 = async () => {
    await wait1();
    for (let i = 0; i < 5; i++) {
      const next = v + 1;
      await wait2();
      v = next;
    }
  };

  const p2 = async () => {
    for (let i = 0; i < 5; i++) {
      const next = v + 1;
      await wait2();
      v = next;
    }
  };

  await Promise.all([p1(), p2()]);
  log(v);
}
```

# 回答

## i1

### 出力

i1:
42
100

### 理由

`Promise.any` は最初に成功した `wait1().then(() => 42)` の結果 42 を 1秒で返す → すぐ `log(42)`。
しかし他の Promise はキャンセルされないため、2秒後に `(v = 100)` が走って v が 100 に上書きされる。
その後の `await wait2()` 後に `log(v)` → 100。

## i2

### 出力

i2:
C
B
A
[ 'A', 'B', 'C' ]

### 理由

`then`内のログは完了順に出るので、1秒後 `C`、2秒後 `B`、3秒後 `A`。
`Promise.all` の戻り値は入力順の配列なので、解決時に `["A","B","C"]` を出力。

```Mermaid
gantt
  title i2
  dateFormat  s
  axisFormat |
    wait1 then C                      :w1, 0, 1s
    log C                             :c,  after w1, 0.2s
    wait2 then B                      :w2, 0, 2s
    log B                             :b,  after w2, 0.2s
    wait3 then A                      :w3, 0, 3s
    log A                             :a,  after w3, 0.2s
    array A B C          :all, after a, 0.2s
```

## i3

### 出力

i3:
Y
42
B
0

### 理由

`Promise.all` は最初に失敗した時点で失敗する。1秒後に `errY()` が投げられ、`catch` に入り `"Y"` と当時の `v(=42)` を出力。
その後も他の処理は継続するため、2秒時点の `logB()` が出る。3秒で `v = 0` が実行されるので、最後の `log(v)`（`catch`内の追加待機の後）は 0。

## i4

### 出力

元コード
i4:
5

修正コード
i4_fixed:
10

### 理由

## i4（元コードの問題点）

- 2つのタスク（`p1`, `p2`）が同じ共有変数 `v` に「`v+1` を書く」処理を同時並行で繰り返す。
- しかも `const next = v + 1` → `await` → `v = next`** という形で、読み取りと書き込みの間に `await` が挟まっている**。
- これにより、古い `v` をもとにした値の上書きが起き、10 にならない（小さめの値で終わる）。
