//「Nodeのモジュール」方式＝CommonJS（require と module.exports）で別ファイルから利用する

// simpleUtils.cjs を require で読み込み
const { double, Dog } = require("./simpleUtils.cjs");

console.log("5を2倍にすると:", double(5));

const pochi = new Dog("ポチ");
console.log(pochi.bark());