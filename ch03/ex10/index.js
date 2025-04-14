// Symbol() を使い、同じ文字列から生成された 2 個の Symbol 変数を作成
let s1 = Symbol("sym_x");
let s2 = Symbol("sym_x");

// それらをプロパティとして持つオブジェクトを作成
let o = {};
o[s1] = 1;
o[s2] = 2;

// そのオブジェクトに対して、作成したSymbol変数を使って各プロパティの値を取得
console.log(o[s1]); // 1
console.log(o[s2]); // 2

// Symbol()ではなく、Symbol.for()で同名の変数を作成した場合
s1 = Symbol.for("sym_x");
s2 = Symbol.for("sym_x");

o[s1] = 1;
o[s2] = 2;

console.log(o[s1]); // 2、Symbol.forを利用している、かつ、s1とs2は同じ文字列を使って呼び出しているので常に同じ値と判定され、上書きされる
console.log(o[s2]); // 2