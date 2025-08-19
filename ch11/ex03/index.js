// リトルエンディアンからビッグエンディアンへの変換
export function littleToBig(arr) {
  const result = new Uint32Array(arr.length);
  for (let i = 0; i < arr.length; i++) {
    const x = arr[i];
    result[i] =
      ((x >>> 24) & 0xff) |        // byte3 → byte0
      ((x >>> 8) & 0xff00) |       // byte2 → byte1
      ((x & 0xff00) << 8) |        // byte1 → byte2
      ((x & 0xff) << 24);          // byte0 → byte3
  }
  return result;
}

// ビッグエンディアンからリトルエンディアンへの変換
export function bigToLittle(arr) {
  const result = new Uint32Array(arr.length);
  for (let i = 0; i < arr.length; i++) {
    const x = arr[i];
    result[i] =
      ((x >>> 24) & 0xff) |
      ((x >>> 8) & 0xff00) |
      ((x & 0xff00) << 8) |
      ((x & 0xff) << 24);
  }
  return result;
}

