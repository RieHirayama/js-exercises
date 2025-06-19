// 空のオブジェクトを作成
const obj = {};

// プロパティ "x" を定義
Object.defineProperty(obj, "x", {
  value: 500, // 初期値
  writable: true, // 書き換え可
  enumerable: true, // 列挙可
  configurable: true // 削除や再定義可
});

console.log("初期値:", obj.x); // 500

obj.x = 200;
console.log("書き換え後:", obj.x); // 200

delete obj.x;
console.log("削除後:", obj.x); // undefined

// 再定義
try {
  Object.defineProperty(obj, "x", {
    value: 300,
    writable: true, // 書き換え可
    enumerable: true, // 列挙可
    configurable: true // 削除や再定義可
  });
} catch (e) {
  console.log("再定義エラー:", e.message);
}
console.log("再定義後:", obj.x); // 300

console.log("hasOwnProperty:", obj.hasOwnProperty("x")); // true
console.log("propertyIsEnumerable:", obj.propertyIsEnumerable("x")); // true

console.log("for...in 結果:");
for (let key in obj) {
  console.log(key); // 出る
}

console.log("Object.keys:", Object.keys(obj)); // 300

// プロパティ "x" を定義
Object.defineProperty(obj, "x", {
  value: 100,
  writable: false, // 書き換え不可
  enumerable: false, // 列挙不可
  configurable: false // 削除や再定義不可
  // configurable: false にしたプロパティは、以降 Object.defineProperty で再定義できない
});

console.log("属性変更後値:", obj.x); // 100

try {
obj.x = 200;
} catch (e) {
  console.log("書き換えエラー:", e.message); // 書き換え不可なのでエラー
}
console.log("書き換え後:", obj.x); // 100

try {
    delete obj.x;
} catch (e) {
  console.log("削除エラー:", e.message); // 削除不可なのでエラー
}
console.log("削除後:", obj.x); // 100

// 再定義をしようとするとエラーが発生
try {
  Object.defineProperty(obj, "x", {
    value: 300
  });
} catch (e) {
  console.log("再定義エラー:", e.message);
}

console.log("hasOwnProperty:", obj.hasOwnProperty("x")); // true
console.log("propertyIsEnumerable:", obj.propertyIsEnumerable("x")); // false

console.log("for...in 結果:");
for (let key in obj) {
  console.log(key); // 出ない
}

console.log("Object.keys:", Object.keys(obj)); // []



----
// 出力結果
// PS C:\JS_training\js-exercises> node .\ch06\ex04\index.js
// 初期値: 500
// 書き換え後: 200
// 削除後: undefined
// 再定義後: 300
// hasOwnProperty: true
// propertyIsEnumerable: true
// for...in 結果:
// x
// Object.keys: [ 'x' ]
// 属性変更後値: 100
// 書き換えエラー: Cannot assign to read only property 'x' of object '#<Object>'
// 書き換え後: 100
// 削除エラー: Cannot delete property 'x' of #<Object>
// 削除後: 100
// 再定義エラー: Cannot redefine property: x
// hasOwnProperty: true
// propertyIsEnumerable: false
// for...in 結果:
// Object.keys: []