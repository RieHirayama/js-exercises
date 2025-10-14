export function template(strings, ...values) {
  // typeof の結果を返す
  const toType = (v) => typeof v;

  // 文字列パートと型名を交互に連結
  let out = '';
  for (let i = 0; i < strings.length; i++) {
    out += strings[i];
    if (i < values.length) out += toType(values[i]);
  }
  return out;
}

