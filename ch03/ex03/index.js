//2 個の数値を受け取り、それらの値が同値かどうかを判定する関数
export function isEqual(a, b) {
    console.log("isEqual", a, b); // デバッグ用
  return Math.abs(a - b) < (1e-10);
}