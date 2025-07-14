// 同じスコープの中で複数の入れ子型の関数を定義して、同じスコープチェーンを共有
// xはコンストラクタスコープに閉じ込められ、外部から this.x などでアクセスできない。
export class PositiveNumber {
  constructor(initialX) {
    if (initialX <= 0) {
      throw new Error("x > 0であることが必要です。");
    }

    let x = initialX;

    this.getX = function () {
      return x;
    };

    this.setX = function (newX) {
      if (newX <= 0) {
        throw new Error("x > 0であることが必要です。");
      }
      x = newX;
    };
  }
}