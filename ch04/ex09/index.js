//typeof 演算子のオペランドに、`undefined`, `null`, `オブジェクト`, `NaN`, `数値`, `関数` を指定したときの返り値を出力

console.log(typeof undefined); // "undefined"
console.log(typeof null); // "object"  
console.log(typeof {}); // "object"        
console.log(typeof NaN); // "number" 
console.log(typeof 42); // "number"   
console.log(typeof function(){}); // "function" 
console.log(typeof Symbol()); // "symbol"
console.log(typeof BigInt(42)); // "bigint"
console.log(typeof true); // "boolean" 
console.log(typeof "hello"); // "string" 
console.log(typeof [1, 2, 3]); // "object" 
console.log(typeof new Date()); // "object"
