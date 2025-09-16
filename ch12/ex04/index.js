// p.363のfilter関数
// 指定したiterableをフィルタした反復可能なオブジェクトを返す
// predicateがtrueを返す要素のみを反復する
export function filter(iterable, predicate) {
  let iterator = iterable[Symbol.iterator]();
  return {   // このオブジェクトはイテレータであり、反復可能でもある
    [Symbol.iterator]() { return this; },
    next() {
      for (;;) {  // 条件を満たす要素が見つかるまで繰り返す
        let v = iterator.next();
        if (v.done || predicate(v.value)) {
          return v;
        }
      }
    }
  };
}

// 2,3,4,5,... と続く無限の整数列を返すジェネレータ
function* integersFrom(start = 2) {
  let n = start;
  while (true) {
    yield n;
    n = n + 1;
  }
}

export function* primes() {
  function* filterPrimes(iterable) {
    const it = iterable[Symbol.iterator]();

    // まず1つ取り出す（これが次の素数）
    const first = it.next();
    if (first.done) return; // 無限列なのでここには来ないけど念のため入れとく
    const p = first.value;

    // 見つけた素数を返す
    yield p;

    // 続きから p の倍数を除外した列を作る
    const withoutMultiplesOfP = filter(it, (n) => n % p !== 0);

    // 再帰的に同じ処理を続ける
    yield* filterPrimes(withoutMultiplesOfP);
  }

  // 2 から始まる整数列で倍数を除去していく
  yield* filterPrimes(integersFrom(2));
}

