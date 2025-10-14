export class MyArrayLike {
  constructor(length = 0) {
    this.length = length;
  }

  // Array.from() で取り出せるようにジェネレータでイテラブル作成
  *[Symbol.iterator]() {
    for (let i = 0; i < this.length; i++) {
      yield this[i];
    }
  }
}

export class MyArray extends Array {
  constructor(items) {
    super(...items);
  }

  static get [Symbol.species]() {
    return MyArrayLike; // map()やslice()の結果をMyArrayLikeクラスで作る
  }
}
