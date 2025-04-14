
let maxVal = Number.MAX_SAFE_INTEGER; // JSの整数の最大値:9007199254740991
let minVal = Number.MIN_SAFE_INTEGER; // JSの整数の最小値:-9007199254740991

console.log(maxVal); // JSの整数の最大値
console.log(minVal); // JSの整数の最小値

console.log(maxVal+1); // JSの整数の最大値+1

console.log(maxVal+2); // JSの整数の最大値+2


console.log((maxVal+1)===(maxVal+2)); // 結果はTrue
console.log("JSは整数の最大値を超えた数値を扱えないので、最大値+1と最大値+2は同じ値になる。");