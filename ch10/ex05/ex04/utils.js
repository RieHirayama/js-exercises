// デフォルトエクスポート（関数）
export default function timesTwo(x) {
  return x * 2;
}

// 名前付きエクスポート（クラス）
export class AnimalDog { // ←Dogを選択してF2を押してAnimalDogに変更
  constructor(name) {
    this.name = name;
  }
  bark() {
    return `${this.name} がワンワン！`;
  }
}