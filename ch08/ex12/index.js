export function f(body) {
  // 引数名（a1 ～ a10）を作成
  const args = [];
  for (let i = 1; i <= 10; i++) {
    args.push("a" + i);
  }

  // $1 ～ $10 を a1 ～ a10 に置き換え
  const replacedBody = body
    .replace(/\$10/g, "a10")
    .replace(/\$([1-9])/g, "a$1");

  
  // body が { で始まらない（つまり式だけ）の場合は、自動的に return を付ける
  const isBlock = replacedBody.trim().startsWith("{");
  const finalBody = isBlock ? replacedBody : `return ${replacedBody};`;

  // 新しい関数を作って返す
  return new Function(...args, finalBody);
}
