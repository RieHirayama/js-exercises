function f(input) {
  const f = new Function(`return "Hello, " + ${input}`);
  console.log(f());
}

// f('process.exit()'); // Node.js を強制終了

f('alert("攻撃されました！")'); // ブラウザでalert 実行

