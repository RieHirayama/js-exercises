import { WarriorClass, MagicWarriorClass, Warrior, MagicWarrior } from './index.js';

describe('WarriorClass', () => {
  test('通常の戦士は atk * 2 のダメージを返す', () => {
    const w = new WarriorClass(10);
    expect(w.attack()).toBe(20);
  });

  test('魔法戦士は atk * 2 + mgc のダメージを返す', () => {
    const mw = new MagicWarriorClass(10, 5);
    expect(mw.attack()).toBe(25);
  });
});

describe('Warrior (prototype)', () => {
  test('通常の戦士は atk * 2 のダメージを返す', () => {
    const w = new Warrior(7);
    expect(w.attack()).toBe(14);
  });

  test('魔法戦士は atk * 2 + mgc のダメージを返す', () => {
    const mw = new MagicWarrior(7, 4);
    expect(mw.attack()).toBe(18);
  });
});
