// p.367のフィボナッチ数を生成するジェネレータ関数
export function* fibonacciSequence(){
  let x = 0, y = 1;
  for(;;){
    yield x;
    [x, y] = [y, x + y]; // 分割代入を行っている
  }
}

export function fibonacciIterator() {
  let x = 0, y = 1;

  const it = {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      const value = x; 
      [x, y] = [y, x + y]; 
      return { value, done: false };
    },

    return() {
      return { value: undefined, done: true };
    },

    throw(e) {
      throw e;
    }
  };

  return it;
}