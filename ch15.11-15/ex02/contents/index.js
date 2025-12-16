const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");
const button = document.querySelector("#add-button");

// UI の無効化・有効化を切り替える関数
function setUIDisabled(disabled) {
  input.disabled = disabled;
  button.disabled = disabled;
  
  // チェックボックスと削除ボタンも無効化
  document.querySelectorAll("#todo-list input[type='checkbox']").forEach(el => {
    el.disabled = disabled;
  });
  document.querySelectorAll("#todo-list button").forEach(el => {
    el.disabled = disabled;
  });
}

// AbortController を使用したタイムアウト機能付き fetch
function fetchWithTimeout(url, options = {}) {
  if (options.timeout) {
    const controller = new AbortController();
    options.signal = controller.signal;
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, options.timeout);
    
    // fetch の結果（成功/失敗）に関わらず、タイムアウトタイマーをクリア
    return fetch(url, options).finally(() => {
      clearTimeout(timeoutId);
    });
  }
  return fetch(url, options);
}

// 非同期対応版 retryWithExponentialBackoff関数　
// 仕様
// - 受け取った関数 `func` を呼び出し、func が true を返せばそこで終了する
// - `func` が `false` を返した場合は以下の待ち時間後に `func` 呼び出しをリトライする
// - 待ち時間は`func`の呼び出し回数に応じて 1 秒, 2 秒, 4 秒, ...と 2 倍に増えていく
// - `maxRetry` 回リトライしても成功しない場合はそこで終了する
// - `retryWithExponentialBackoff`に対する呼び出しは即座に完了し、`func` の呼び出しは非同期に行われる
// - `func` が `true` を返す、または maxRetry 回のリトライが失敗し終了する際、その結果(`true`/`false`)~を引数として関数 `callback` が呼び出される~
// - `func` は同期関数であることを想定していたが、非同期関数対応に変更した
async function retryWithExponentialBackoff(func, maxRetry) {
  let retriesLeft = Math.max(0, maxRetry | 0);
  let delayMs = 1000;

  while (true) {
    try {
      const result = await func();
      if (result) {
        return true; // 成功
      }
    } catch (e) {
      // 例外が発生した場合
      if (retriesLeft === 0) {
        throw e; // 最後のリトライで失敗したら例外を投げる
      }
    }

    if (retriesLeft === 0) {
      return false; // リトライ失敗
    }

    await new Promise(resolve => setTimeout(resolve, delayMs));
    delayMs *= 2;
    retriesLeft -= 1;
  }
}

// リトライ + タイムアウト機能付き fetch
async function fetchWithRetryAndTimeout(url, options = {}, maxRetry = 2) {
  let lastResponse = null;

  const success = await retryWithExponentialBackoff(async () => {
    try {
      const response = await fetchWithTimeout(url, {
        ...options,
        timeout: 3000 // 3秒でタイムアウト
      });

      if (response.status >= 500) {
        // 500番台エラーはリトライ対象
        return false;
      }

      // 成功（200-499番）
      lastResponse = response;
      return true;
    } catch (error) {
      if (error.name === "AbortError") {
        throw new Error("リクエストがタイムアウトしました");
      }
      throw error;
    }
  }, maxRetry);

  if (success && lastResponse) {
    return lastResponse;
  }

  throw new Error("リトライが失敗しました");
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    setUIDisabled(true); // UI を無効化
    
    const response = await fetchWithRetryAndTimeout("/api/tasks", {}, 2);
    const { items } = await response.json();
    items.forEach(appendToDoItem);
  } catch (err) {
    alert(err.message);
  } finally {
    setUIDisabled(false); // UI を有効化
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault(); // フォームのデフォルト動作（ページリロード）を防ぐ

  // 両端からホワイトスペースを取り除いた文字列を取得する
  const todo = input.value.trim();
  if (todo === "") {
    return;
  }

  // new-todo の中身は空にする
  input.value = "";


  try {
  setUIDisabled(true); // UI を無効化
  
  const response = await fetchWithRetryAndTimeout("/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: todo })
  }, 2);
  
  const created = await response.json();
  appendToDoItem(created);
} catch (err) {
  alert(err.message);
} finally {
  setUIDisabled(false); // UI を有効化
}
});

// API から取得したタスクオブジェクトを受け取って、ToDo リストの要素を追加する
function appendToDoItem(task) {
  // ここから #todo-list に追加する要素を構築する
  const elem = document.createElement("li");

  const label = document.createElement("label");
  label.textContent = task.name;
  label.style.textDecorationLine = "none";

  const toggle = document.createElement("input");
  toggle.type = "checkbox";
  toggle.checked = task.status === "completed";
  label.style.textDecorationLine = toggle.checked ? "line-through" : "none";

  toggle.addEventListener("change", async () => {
    const nextStatus = toggle.checked ? "completed" : "active";
    try {
      setUIDisabled(true);
      
      const response = await fetchWithRetryAndTimeout(`/api/tasks/${task.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus })
      }, 2);
      
      const updated = await response.json();
      label.style.textDecorationLine =
        updated.status === "completed" ? "line-through" : "none";
    } catch (err) {
      toggle.checked = !toggle.checked;
      alert(err.message);
    } finally {
      setUIDisabled(false);
    }
  });

  const destroy = document.createElement("button");
  destroy.textContent = "❌";
  destroy.addEventListener("click", async () => {
    try {
      setUIDisabled(true);
      
      await fetchWithRetryAndTimeout(`/api/tasks/${task.id}`, {
        method: "DELETE"
      }, 2);
      
      elem.remove();
    } catch (err) {
      alert(err.message);
    } finally {
      setUIDisabled(false);
    }
  });

  elem.append(toggle, label, destroy);
  list.prepend(elem);
}
