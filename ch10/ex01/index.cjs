const stats = require("./stats.cjs");
const { BitSet } = require("./sets.cjs");

const s = new BitSet(100);
s.insert(10);
s.insert(20);
s.insert(30);

const average = stats.mean([...s]);


// 確認用コンソール出力
console.log("mean:", average);

