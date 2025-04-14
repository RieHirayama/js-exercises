// 正負のInfinity と NaN で +, -, \*, / の計算を全ての組み合わせで結果表示
// 前項の候補（Infinity,-Infinity,NaN）×　後項の候補（Infinity,-Infinity,NaN）　×　演算子の種類　= 3×3×4=36通り
// ※NaNは正負の概念がないので、NaNの正負は考えない。


console.log(Infinity+Infinity); // Infinity
console.log(Infinity-Infinity); // NaN
console.log(Infinity*Infinity); // Infinity
console.log(Infinity/Infinity); // NaN

console.log("\n");

console.log(-Infinity+Infinity); // NaN
console.log(-Infinity-Infinity); // -Infinity
console.log(-Infinity*Infinity); // -Infinity
console.log(-Infinity/Infinity); // NaN

console.log("\n");

console.log(Infinity+(-Infinity)); // NaN
console.log(Infinity-(-Infinity)); // Infinity
console.log(Infinity*(-Infinity)); // -Infinity
console.log(Infinity/(-Infinity)); // NaN

console.log("\n");

console.log(-Infinity+(-Infinity)); // -Infinity
console.log(-Infinity-(-Infinity)); // NaN 
console.log(-Infinity*(-Infinity)); // Infinity
console.log(-Infinity/(-Infinity)); // NaN

console.log("\n");

console.log(NaN+Infinity); // NaN
console.log(NaN-Infinity); // NaN
console.log(NaN*Infinity); // NaN
console.log(NaN/Infinity); // NaN

console.log("\n");

console.log(Infinity+NaN); // NaN
console.log(Infinity-NaN); // NaN
console.log(Infinity*NaN); // NaN
console.log(Infinity/NaN); // NaN

console.log("\n");

console.log(-Infinity+NaN); // NaN
console.log(-Infinity-NaN); // NaN
console.log(-Infinity*NaN); // NaN
console.log(-Infinity/NaN); // NaN

console.log("\n");

console.log(NaN+(-Infinity)); // NaN
console.log(NaN-(-Infinity)); // NaN
console.log(NaN*(-Infinity)); // NaN
console.log(NaN/(-Infinity)); // NaN

console.log("\n");

console.log(NaN+NaN); // NaN
console.log(NaN-NaN); // NaN
console.log(NaN*NaN); // NaN
console.log(NaN/NaN); // NaN


