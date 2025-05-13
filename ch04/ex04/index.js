// 与えられた数値を 32 ビット整数表現形式で表現した場合に 1 であるビットの数を返す関数 `bitCount` を実装

export function bitCount(n) {
    let count = 0; // 1 のビットの数をカウントする変数
    let mask = 1; // ビットマスク

    // 32 ビット整数表現形式で n を処理
    for (let i = 0; i < 32; i++) {
        if ((n & mask) !== 0) {
            count++; // ビットが 1 の場合、カウントを増やす
        }
        mask <<= 1; // マスクを左シフトして次のビットに移動
    }

    return count; // カウントを返す
}