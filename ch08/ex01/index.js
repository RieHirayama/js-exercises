
// 引数が複数なので、引数の括弧は必要、
// かつ、戻り値がreturn文の1行だけではないので、関数本体の中括弧も必要
export const fn1 = (n,c) => {
    let result = [];
    for (let i = 0; i < n; i++){
        console.log(c);
        result.push(c);
    }
    return result
} 

// 引数が1つなので、引数の括弧は不要、
// かつ、戻り値がreturn文の1行なのでreturnも｛｝も不要
export const fn2 = x => x ** 2;

// 引数が無いので、引数の括弧は必要、
// かつ、戻り値がreturn文1行だけなので{}もreturnも省略できるが、
// 戻り値がオブジェクトのため、関数本体の中括弧ではなくオブジェクトの中括弧であることを
// 区別するためにオブジェクトリテラルを丸括弧で囲む必要がある
export const fn3 = () => ({now: new Date().toLocaleString()});