export function makeProxyAndLogs(target) {
  const logs = [];

  const handler = {
    get(t, prop, receiver) {
      // プロパティ値を取得
      const value = Reflect.get(t, prop, receiver);

      // 関数なら呼び出し時にログを積むラッパーを返す
      if (typeof value === "function") {
        return function (...args) {
          logs.push({
            name: String(prop),
            args: args.slice(),
            timestamp: Date.now(),
          });
          return Reflect.apply(value, receiver, args);
        };
      }

      // 関数じゃない場合は何もせず値をそのまま返す（プロパティ読み取りはログ対象外）
      return value;
    },
  };

  const proxy = new Proxy(target, handler);
  return [proxy, logs];
}

