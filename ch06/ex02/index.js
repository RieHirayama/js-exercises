// オブジェクトリテラルで独自プロパティを持つオブジェクトを定義し、Object.create を使用してそのオブジェクトをプロトタイプとして持つ新しいオブジェクト生成しなさい。
// Object.getPrototypeOf()を利用して、生成したオブジェクトのプロトタイプが Object.create で渡したオブジェクトになっていることを確認しなさい。

const prototypeObject = {
  property1: 'hello',
  property2: 'world',
};

const newObject = Object.create(prototypeObject);

console.log(newObject.property1); // hello
console.log(newObject.property2); // world
console.log(Object.getPrototypeOf(newObject) === prototypeObject); // true
