const obj1 = {x: 1};
// 問題: ここに1行コードを書くことで以下の行で {x: 1, y: 2} が出力されること
obj1.y = 2;
console.log(obj1);

const obj2 = {x: 1, y: 2};
// 問題: 以下の行では何が出力されるか、予想してから結果を確認しなさい
console.log(obj1 === obj2);

export function equals(o1, o2) {
    // o1とo2が厳密に等価である場合trueを返す
    // 厳密等価 (===)、等価 (==)、厳密等価演算子はオペランドの型が異なる場合、常に異なるものと判断される
    // 例えば、1 === "1" は false、1 == "1" は true になる
    if (o1 === o2) {
        return true;
    }
    // o1 または o2 に null またはオブジェクト以外が指定された場合 false を返す (tyepof の返り値が object かどうかを確認しなさい)
    if (o1 === null || o2 === null || typeof o1 !== "object" || typeof o2 !== "object") {
        return false;
    }
    // o1 と o2 のプロパティの数・名前が一致しない場合は false を返す
    /* if (Object.keys(o1).length !== Object.keys(o2).length) {
        return false;
    }
    for (let i=0; i< Object.keys(o1).length; i++) {
        if (Object.keys(o1)[i] !== Object.keys(o2)[i]) {
            return false;
        }
    }
    */
    const keys1 = Object.keys(o1);
    const keys2 = Object.keys(o2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    for (let key of keys1) {
        if (!keys2.includes(key)) {
            return false;
        }
    }

    // o1 と o2 のプロパティの各値を equals で比較し、全て true ならば true を返し、1つでも false があれば false を返す
    /* for (let i=0; i< Object.keys(o1).length; i++) {
        //if (!equals(Object.keys(o1)[i], Object.keys(o2)[i])) {
        //    return false;
        //}
        if (!Object.keys(o2).includes(Object.keys(o1)[i])) { // 順番とか違ってもo2のプロパティがo1のプロパティに含まれているかを確認する
            return false;
        }
        if (!equals(o1[i], o2[i])) {
            return false;
        }
    }
    */
    for (let key of keys1) { // keysを使うことでプロパティの順番を気にしなくて済む
        if (!equals(o1[key], o2[key])) {
            return false;
        }
    }
    
    return true;
}
