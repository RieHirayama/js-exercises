export function retryWithExponentialBackoff(func, maxRetry, callback) {
  let retriesLeft = Math.max(0, maxRetry | 0);
  let delayMs = 1000; // 1秒から開始

  function tryOnce() {
    let ok = false;
    try {
      ok = func(); 
    } catch (e) {
      ok = false; // 例外が発生した場合は失敗とみなす
    }

    if (ok) {
      callback(true);
      return;
    }

    if (retriesLeft === 0) {
      callback(false);
      return;
    }

    setTimeout(tryOnce, delayMs);
    delayMs *= 2;
    retriesLeft -= 1;
  }

  setTimeout(tryOnce, 0);
}

