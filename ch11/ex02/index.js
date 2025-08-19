// f はオブジェクトを1つ引数に取る関数
export function cache(f) {
  const wm = new WeakMap();

  return function (obj) {
    if (wm.has(obj)) {
      // キャッシュ済みなら即返す
      return wm.get(obj);
    }
    // 計算してキャッシュに保存
    const result = f(obj);
    wm.set(obj, result);
    return result;
  };
}

export function slowFn(obj) {
  // 時間のかかる処理
  let sum = 0;
  for (let i = 0; i < 1e7; i++) {
    sum += i;
  }
  return { input: obj, sum };
}

// cachedSlowFnを同じ引数で複数回呼び出すと、2回目以降はキャッシュが返る
const cachedSlowFn = cache(slowFn);

