//classを使った記法

// 戦士クラス
export class WarriorClass {
  constructor(atk) {
    this.atk = atk;
  }

  attack() {
    return this.atk * 2;
  }
}

// 魔法戦士クラス（戦士を継承）
export class MagicWarriorClass extends WarriorClass {
  constructor(atk, mgc) {
    super(atk);
    this.mgc = mgc;
  }

  attack() {
    return super.attack() + this.mgc;
  }
}

// prototypeを使った記法

// 戦士コンストラクタ関数
export function Warrior(atk) {
  this.atk = atk;
}

Warrior.prototype.attack = function () {
  return this.atk * 2;
};

// 魔法戦士コンストラクタ関数
export function MagicWarrior(atk, mgc) {
  Warrior.call(this, atk); // Warriorを継承（Warriorを関数MagicWarriorのメソッドとして呼び出す）
  this.mgc = mgc;
}

// Warriorのプロトタイプを継承
MagicWarrior.prototype = Object.create(Warrior.prototype); // MagicWarrior.prototype が Warrior.prototype を継承
MagicWarrior.prototype.constructor = MagicWarrior; // constructor プロパティを MagicWarrior に戻す

// 親クラス（Warrior）の attack メソッドをオーバーライドして、魔力（mgc）分を加算する
MagicWarrior.prototype.attack = function () {
  return Warrior.prototype.attack.call(this) + this.mgc;
};