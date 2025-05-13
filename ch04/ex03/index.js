// ビット演算のみ(`+` や `===` 等は禁止)を用いて減算を行う関数 `sub` を実装。負の値を扱うために2の補数を使用。
export function sub(a, b) {
    let negB = ~b; // b の 1 の補数を計算
    let carry = 1; // 1 を加えるためのキャリー

    // キャリーを使って 1 を加算
    while (carry !== 0) {
        let temp = negB & carry; // キャリーを計算
        negB = negB ^ carry; // キャリーを加算
        carry = temp << 1; // キャリーを左シフトして次の桁に持っていく
    }

    let result = a;

    // a と negB を加算して減算を実現
    while (negB !== 0) {
        let carry = result & negB; // キャリーを計算
        result = result ^ negB; // 足し算
        negB = carry << 1; // キャリーを左シフトして次の桁に持っていく
    }

    return result;
}