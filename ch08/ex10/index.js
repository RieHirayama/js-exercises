export function addMyCall(f) {
  f.myCall = function (thisArg, ...args) {
    // bind 第一引数をthisに設定し、第二引数を引数として即時実行
    return f.bind(thisArg)(...args);
  };
}

