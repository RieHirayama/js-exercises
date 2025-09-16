# 問題

関数 counterIter() 及び counterGen() を利用して、イテレータ及びジェネレータに対して「調査対象の操作」に示す操作をしたときに、どの部分が実行されるのかを調査するコードを作成し、実行結果と動作の説明を記述しなさい

## 調査対象の操作

- 明示的に[イテレータプロトコル](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Iteration_protocols)の next() を呼び出す
- 明示的に[イテレータプロトコル](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Iteration_protocols)の return() を呼び出す
- 明示的に[イテレータプロトコル](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Iteration_protocols)の throw() を呼び出す
- for-of ループを実行
- for-of ループを実行途中で break
- for-of ループを実行中に例外発生

## イテレータプロトコル

反復可能プロトコル (iterable protocol) によって、 JavaScript のオブジェクトは反復動作を定義またはカスタマイズすることができます。例えば、 for...of 構造の中でどの値がループに使われるかです。

- 反復可能であるために、オブジェクトは [Symbol.iterator]() メソッドを実装する必要があります。
- [Symbol.iterator]() メソッド: イテレータープロトコルに準拠するオブジェクトを返す、引数なしの関数。

# 回答

## 明示的に next() を呼ぶ

### コード

```
console.log("\n=== " + "明示的に next() を呼ぶ" + " ===");
{
const it = counterIter(3);
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());

const g = counterGen(3);
console.log(g.next());
console.log(g.next());
console.log(g.next());
console.log(g.next());
}
```

### 実行結果

```
=== 明示的に next() を呼ぶ ===
counterIter
counterIter: next
{ value: 1, done: false }
counterIter: next
{ value: 2, done: false }
counterIter: next
{ value: 3, done: false }
counterIter: next
{ value: undefined, done: true }
counterGen
counterGen: next
{ value: 1, done: false }
counterGen: next
{ value: 2, done: false }
counterGen: next
{ value: 3, done: false }
counterGen: finally
{ value: undefined, done: true }
```

### 動作説明

- iter: counterIter() 呼び出し時に "counterIter"。next()毎に"counterIter: next"。
- gen: counterGen()呼び出し直後は何も出ない（遅延実行）。最初のnext()で "counterGen"→ 直後に"counterGen: next"。最後の要素を呼んだ次のnext()で "counterGen: finally"が出てdone:true。

## 明示的に return() を呼ぶ

### コード

```
console.log("\n=== " + "明示的に return() を呼ぶ" + " ===");
{
const it = counterIter(3);
it.next();
console.log(it.return("bye"));
console.log(it.next());

const g = counterGen(3);
g.next();
console.log(g.return("bye"));
console.log(g.next());
}
```

### 実行結果

```
=== 明示的に return() を呼ぶ ===
counterIter
counterIter: next
counterIter: return: bye
{ value: 'bye', done: true }
counterIter: next
{ value: 2, done: false }
counterGen
counterGen: next
counterGen: finally
{ value: 'bye', done: true }
{ value: undefined, done: true }
```

### 動作説明

- iter: return(bye)で"counterIter: return: bye"。その後、継続してcounterIter: nextとなり{ value: 2, done: false }が出る。
- gen: return()でfinallyが実行されている。返り値は {value:bye, done:true}。その後、{ value: undefined, done: true }が出る。

## 明示的に throw() を呼ぶ

### コード

```
console.log("\n=== " + "明示的に throw() を呼ぶ" + " ===");
{
const it = counterIter(3);
try {
it.throw(new Error("E-iter"));
} catch (e) {
console.log("caught:", e.message);
}

const g = counterGen(3);
g.next();
try {
g.throw(new Error("E-gen"));
} catch (e) {
console.log("caught:", e.message);
}
}
```

### 実行結果

```
=== 明示的に throw() を呼ぶ ===
counterIter
counterIter: throw: Error: E-iter
at file:///C:/JS_training/js-exercises/ch12/ex01/index.js:113:14
at ModuleJob.run (node:internal/modules/esm/module_job:218:25)
at async ModuleLoader.import (node:internal/modules/esm/loader:329:24)
at async loadESM (node:internal/process/esm_loader:28:7)
at async handleMainPromise (node:internal/modules/run_main:113:12)
caught: E-iter
counterGen
counterGen: next
counterGen: catch: Error: E-gen
at file:///C:/JS_training/js-exercises/ch12/ex01/index.js:121:13
at ModuleJob.run (node:internal/modules/esm/module_job:218:25)
at async ModuleLoader.import (node:internal/modules/esm/loader:329:24)
at async loadESM (node:internal/process/esm_loader:28:7)
at async handleMainPromise (node:internal/modules/run_main:113:12)
counterGen: finally
caught: E-gen
```

### 動作説明

- iter: throw(new Error("E-iter"))でログ "counterIter: throw: Error: E-iter"を出し、その後、準備した外側でのcatchで"caught: E-iter"が出力されている（外側にcatch必要）。
- gen: throw(new Error("E-gen"))は"counterGen: catch: Error: E-gen"というログを出しているので、ジェネレート内部のcatchで処理されてそう。その後内部finallyのログ"counterGen: finally"も出ている。その後、準備した外側でのcatchで"caught: E-gen"が出力されている（内側でcatch処理してくれる）。

## for-of ループを実行

### コード

```
console.log("\n=== " + "for-of ループを実行" + " ===");
{
console.log("-- iter --");
for (const v of counterIter(3)) {
console.log("loop:", v);
}

console.log("-- gen --");
for (const v of counterGen(3)) {
console.log("loop:", v);
}
}
```

### 実行結果

```
=== for-of ループを実行 ===
-- iter --
counterIter
counterIter: Symbol.iterator
counterIter: next
loop: 1
counterIter: next
loop: 2
counterIter: next
loop: 3
counterIter: next
-- gen --
counterGen
counterGen: next
loop: 1
counterGen: next
loop: 2
counterGen: next
loop: 3
counterGen: finally
```

### 動作説明

- iter:for-ofが最初に[Symbol.iterator]()を1回呼ぶ"counterIter: Symbol.iterator"。その後next()を繰り返し、maxまでループしたら終了。return()は呼ばれない。
- gen: ループがmaxまで行ったら、finallyが実行されている"counterGen: finally"。

## for-of を途中で break

### コード

```
console.log("\n=== " + "for-of を途中で break" + " ===");
{
console.log("-- iter --");
for (const v of counterIter(3)) {
console.log("loop:", v);
if (v === 2) break;
}

console.log("-- gen --");
for (const v of counterGen(3)) {
console.log("loop:", v);
if (v === 2) break;
}
}
```

### 実行結果

```
=== for-of を途中で break ===
-- iter --
counterIter
counterIter: Symbol.iterator
counterIter: next
loop: 1
counterIter: next
loop: 2
counterIter: return: undefined
-- gen --
counterGen
counterGen: next
loop: 1
counterGen: next
loop: 2
counterGen: finally
```

### 動作説明

- iter: breakでループを中断したときに、return()が呼ばれている"counterIter: return: undefined"。
- gen: breakでループを中断したときに、finallyが実行されている"counterGen: finally"。

## for-of 中に例外発生

### コード

```
console.log("\n=== " + "for-of 中に例外発生" + " ===");
{
console.log("-- iter --");
try {
for (const v of counterIter(3)) {
console.log("loop:", v);
if (v === 2) throw new Error("exception");
}
} catch (e) {
console.log("caught:", e.message);
}

console.log("-- gen --");
try {
for (const v of counterGen(3)) {
console.log("loop:", v);
if (v === 2) throw new Error("exception");
}
} catch (e) {
console.log("caught:", e.message);
}
}
```

### 実行結果

```
=== for-of 中に例外発生 ===
-- iter --
counterIter
counterIter: Symbol.iterator
counterIter: next
loop: 1
counterIter: next
loop: 2
counterIter: return: undefined
caught: exception
-- gen --
counterGen
counterGen: next
loop: 1
counterGen: next
loop: 2
counterGen: finally
caught: exception
```

### 動作説明

- iter: 例外が発生するとreturn()が呼ばれている"counterIter: return: undefined"。その後、準備した外側でのcatchで"caught: exception"が出力されている。内部のcatchは動いていない。
- gen: 例外が発生するとfinallyが呼ばれ、その後、準備した外側でのcatchで"caught: exception"が出力されている。内部のcatchは動いていない。
