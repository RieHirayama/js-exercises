// 改行ごとに1行ずつ返すジェネレータ（改行は含めない）
// 改行コードは\n のみ（\r\n や \r は考慮しない）
import fs from 'node:fs';

export function* readLines(filePath, options = {}) {
  const bufferSize = options.bufferSize ?? 16 * 1024;
  const fd = fs.openSync(filePath, 'r');
  const decoder = new TextDecoder('utf-8');
  const buf = Buffer.allocUnsafe(bufferSize);

  let carry = ''; // 次の読み込みに持ち越し

  try {
    while (true) {
      const n = fs.readSync(fd, buf, 0, buf.length, null);
      if (n === 0) break; // EOF

      // 分割されたバイト列を文字列に変換
      const chunkStr = decoder.decode(buf.subarray(0, n), { stream: true }); //分割時の境界で文字が割れても壊さないために stream:true を使う
      const text = carry + chunkStr;

      // 改行で分割
      const parts = text.split('\n');
      carry = parts.pop() ?? ''; // 最後の部分は次回に持ち越し

      // 改行で分割した各行を yield
      for (const line of parts) {
        yield line;
      }
    }
    // 最後に残った部分を出力
    const tail = carry + decoder.decode();
    if (tail !== '') {
      yield tail;
    }
  } finally {
    fs.closeSync(fd); // 途中break/例外でも必ずクローズ
  }
}

