// p.372で例示のthrowメソッドを使う
export function* resettableCounter() {
  let cnt = 0;
  while (true) {
    try {
      yield cnt;
      cnt += 1;
    } catch (e) {
      cnt = 0;
    }
  }
}


const g = resettableCounter();

console.log(g.next().value);    // 0
console.log(g.next().value);    // 1
console.log(g.next().value);    // 2

console.log(g.throw().value);   // 0 にリセット
console.log(g.next().value);    // 1
console.log(g.next().value);    // 2
console.log(g.next().value);    // 3

