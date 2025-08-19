// デフォルトエクスポート（関数）
export default function double(x) {
  return x * 2;
}

// 名前付きエクスポート（クラス）
export class Dog {
  constructor(name) {
    this.name = name;
  }
  bark() {
    return `${this.name} がワンワン！`;
  }
}