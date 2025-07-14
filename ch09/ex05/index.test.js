import { instanceOf } from "./index.js";

describe('instanceOf', () => {
  class Animal {}
  class Mammal extends Animal {}
  class Dog extends Mammal {}

  class Cat {}

  test('DogはDogのインスタンス', () => {
    const d = new Dog();
    expect(instanceOf(d, Dog)).toBe(true);
  });

  test('DogはMammalのインスタンスでもある (多段継承)', () => {
    const d = new Dog();
    expect(instanceOf(d, Mammal)).toBe(true);
  });

  test('DogはAnimalのインスタンスでもある (多段継承)', () => {
    const d = new Dog();
    expect(instanceOf(d, Animal)).toBe(true);
  });

  test('DogはCatのインスタンスではない', () => {
    const d = new Dog();
    expect(instanceOf(d, Cat)).toBe(false);
  });

});