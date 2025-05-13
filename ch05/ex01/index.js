// 文ブロックを使って同じ関数内に同じ変数名の const を複数宣言する関数を書きなさい。
function test() {
  // 文ブロックを使って同じ関数内に同じ変数名の const を複数宣言する
  {
    const x = 1;
    console.log(x); // 1
  }
  {
    const x = 2;
    console.log(x); // 2
  }
}

test(); // 1 2