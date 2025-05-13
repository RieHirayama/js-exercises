// 何らかのリサイズを行う関数
//
// - params には undefined またはオブジェクトが与えられる
// - params.maxWidth が与えられる場合 (正の整数と仮定して良い) はその値を利用する
// - params.maxHeight が与えられる場合 (正の整数と仮定して良い) はその値を利用する
function resize(params) {
  let maxWidth = 600;
  let maxHeight = 480;

  if (params && params.maxWidth) {
    maxWidth = params.maxWidth;
  }

  if (params && params.maxHeight) {
    maxHeight = params.maxHeight;
  }

  console.log({ maxWidth, maxHeight });
}

//`if` を利用せず `&&` や `||` を用いて `maxWidth` や `maxHeight` を設定する関数 (`resize1`)
function resize1(params) {
    let maxWidth = 600;
    let maxHeight = 480;

    maxWidth = (params && params.maxWidth) || maxWidth;
    maxHeight = (params && params.maxHeight) || maxHeight;

    console.log({ maxWidth, maxHeight });
}

//`if` を利用せず `?.` や `??` を用いて `maxWidth` や `maxHeight` を設定する関数 (`resize2`)
function resize2(params) {
    let maxWidth = 600;
    let maxHeight = 480;

    maxWidth = params?.maxWidth ?? maxWidth;
    maxHeight = params?.maxHeight ?? maxHeight;

    console.log({ maxWidth, maxHeight });
}

resize({ maxWidth: 777, maxHeight: 123 });
resize1({ maxWidth: 777, maxHeight: 123 }); 
resize2({ maxWidth: 777, maxHeight: 123 });

resize({ maxHeight: 123 });
resize1({ maxHeight: 123 }); 
resize2({ maxHeight: 123 });

resize({ maxWidth: 777 });
resize1({ maxWidth: 777 }); 
resize2({ maxWidth: 777 });

resize();
resize1(); 
resize2();