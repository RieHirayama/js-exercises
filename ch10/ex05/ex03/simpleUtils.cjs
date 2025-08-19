// 数を2倍にする関数
function dbl(x) {
  return x * 2;
}

// 犬を表すクラス
class PetDog {
  constructor(name) {
    this.name = name;
  }

  bark() {
    return `${this.name} がワンワン！と吠えた`;
  }
}

module.exports = { double: dbl, Dog: PetDog };