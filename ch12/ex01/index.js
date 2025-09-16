// イテレータ
function counterIter(max) {
  console.log("counterIter");
  let c = 1;
  return {
    [Symbol.iterator]() {
      console.log("counterIter: Symbol.iterator");
      return this;
    },
    next() {
      console.log("counterIter: next");
      if (c >= max + 1) {
        return { value: undefined, done: true };
      }
      const value = c;
      c++;
      return { value, done: false };
    },
    return(value) {
      console.log("counterIter: return:", value);
      return { value, done: true };
    },
    throw(e) {
      console.log("counterIter: throw:", e);
      throw e;
    },
  };
}

// ジェネレータ
function* counterGen(max) {
  console.log("counterGen");
  try {
    for (let c = 1; c <= max; c++) {
      console.log("counterGen: next");
      yield c;
    }
  } catch (e) {
    console.log("counterGen: catch:", e);
    throw e;
  } finally {
    console.log("counterGen: finally");
  }
}


// 明示的に next() を呼ぶ
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
// === 明示的に next() を呼ぶ ===
// counterIter
// counterIter: next
// { value: 1, done: false }
// counterIter: next
// { value: 2, done: false }
// counterIter: next
// { value: 3, done: false }
// counterIter: next
// { value: undefined, done: true }
// counterGen
// counterGen: next
// { value: 1, done: false }
// counterGen: next
// { value: 2, done: false }
// counterGen: next
// { value: 3, done: false }
// counterGen: finally
// { value: undefined, done: true }


// 明示的に return() を呼ぶ
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
// === 明示的に return() を呼ぶ ===
// counterIter
// counterIter: next
// counterIter: return: bye
// { value: 'bye', done: true }
// counterIter: next
// { value: 2, done: false }
// counterGen
// counterGen: next
// counterGen: finally
// { value: 'bye', done: true }
// { value: undefined, done: true }


// 明示的に throw() を呼ぶ
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
// === 明示的に throw() を呼ぶ ===
// counterIter
// counterIter: throw: Error: E-iter
//     at file:///C:/JS_training/js-exercises/ch12/ex01/index.js:83:14
//     at ModuleJob.run (node:internal/modules/esm/module_job:218:25)
//     at async ModuleLoader.import (node:internal/modules/esm/loader:329:24)
//     at async loadESM (node:internal/process/esm_loader:28:7)
//     at async handleMainPromise (node:internal/modules/run_main:113:12)
// caught: E-iter
// counterGen
// counterGen: next
// counterGen: catch: Error: E-gen
//     at file:///C:/JS_training/js-exercises/ch12/ex01/index.js:91:13
//     at ModuleJob.run (node:internal/modules/esm/module_job:218:25)
//     at async ModuleLoader.import (node:internal/modules/esm/loader:329:24)
//     at async loadESM (node:internal/process/esm_loader:28:7)
//     at async handleMainPromise (node:internal/modules/run_main:113:12)
// counterGen: finally
// caught: E-gen


// for-of ループを実行
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
// === for-of ループを実行 ===
// -- iter --
// counterIter
// counterIter: Symbol.iterator
// counterIter: next
// loop: 1
// counterIter: next
// loop: 2
// counterIter: next
// loop: 3
// counterIter: next
// -- gen --
// counterGen
// counterGen: next
// loop: 1
// counterGen: next
// loop: 2
// counterGen: next
// loop: 3
// counterGen: finally


// for-of を途中で break
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
// === for-of を途中で break ===
// -- iter --
// counterIter
// counterIter: Symbol.iterator
// counterIter: next
// loop: 1
// counterIter: next
// loop: 2
// counterIter: return: undefined
// -- gen --
// counterGen
// counterGen: next
// loop: 1
// counterGen: next
// loop: 2
// counterGen: finally


// for-of 中に例外発生
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
// === for-of 中に例外発生 ===
// -- iter --
// counterIter
// counterIter: Symbol.iterator
// counterIter: next
// loop: 1
// counterIter: next
// loop: 2
// counterIter: return: undefined
// caught: exception
// -- gen --
// counterGen
// counterGen: next
// loop: 1
// counterGen: next
// loop: 2
// counterGen: finally
// caught: exception