// `retryWithExponentialBackoff` 関数仕様
// - 受け取った関数 `func` を呼び出し、func が true を返せばそこで終了する
// - `func` が `false` を返した場合は以下の待ち時間後に `func` 呼び出しをリトライする
// - 待ち時間は`func`の呼び出し回数に応じて 1 秒, 2 秒, 4 秒, ...と 2 倍に増えていく
// - `maxRetry` 回リトライしても成功しない場合はそこで終了する
// - `retryWithExponentialBackoff`に対する呼び出しは即座に完了し、`func` の呼び出しは非同期に行われる
// - `func` が `true` を返す、または maxRetry 回のリトライが失敗し終了する際、その結果(`true`/`false`)を引数として関数 `callback` が呼び出される

export function retryWithExponentialBackoff(func, maxRetry) {
  const retriesMax = Math.max(0, maxRetry | 0);
  let retriesLeft = retriesMax;
  let delay = 1000; // 1秒スタート固定
  let timerId = null;
  let finished = false;

  return new Promise((resolve, reject) => {
    const tryOnce = async () => {
      if (finished) return;
      try {
        const val = await func();   // 成功
        finished = true;
        if (timerId) clearTimeout(timerId);
        resolve(val);
      } catch (e) {
        if (retriesLeft === 0) {
          finished = true;
          if (timerId) clearTimeout(timerId);
          reject(e);                // 失敗
          return;
        }
        // 待ってからリトライ
        const waitMs = delay;
        delay = delay * 2;
        retriesLeft -= 1;
        timerId = setTimeout(tryOnce, waitMs);
      }
    };
    // 実行は非同期で開始
    timerId = setTimeout(tryOnce, 0);
  });
}
