// リクエスト用クライアント
// 1. WebSocket サーバに文字列データを含むリクエストメッセージを送信する `sendRequest` 関数を実装しなさい。

//    - 引数としてリクエスト本文を受け取り、返り値としてレスポンス本文が得られる `Promise<string>` を返すこと。
//    - 一定時間内にレスポンスを受信したら、Promise が resolve されること。
//    - 一定時間経過時にタイムアウトし、Promise が reject されること。
//    - WebSocket の接続が切断した場合、Promise が reject されること。
//    - 送信するメッセージの形式は、リクエストが複数並行して送信されてもよいよう考慮すること
//    例
//    ```js
//    const response = await sendRequest("World");
//    console.log(response); // -> "Hello, World"
//    ```

// 今回作成するものは、JSONで id（リクエストID）と type（req/res）を付ける方式にする。
// リクエスト側：{ type:"req", id:"...", body:"World" } を送る → idごとに Promise を待つ
// レスポンス側：type:"req" を受けたら Hello, ${body} を付けて type:"res" で返す（同じ id）
//
const WS_URL = "ws://localhost:3003";
const TIMEOUT_MS = 7000; // 遅延0-5秒なので少し余裕を持たせている状態

const reqWs = new WebSocket(WS_URL);

// pending: id -> { resolve, reject, timer }
const pending = new Map();

reqWs.addEventListener("message", (ev) => {
  let msg;
  try {
    msg = JSON.parse(ev.data);
  } catch {
    return; // 想定外は無視
  }

  if (msg?.type !== "res" || typeof msg.id !== "string") return;

  const p = pending.get(msg.id);
  if (!p) return;

  clearTimeout(p.timer);
  pending.delete(msg.id);
  p.resolve(String(msg.body ?? ""));
});

function rejectAll(reason) {
  for (const [id, p] of pending) {
    clearTimeout(p.timer);
    p.reject(reason);
    pending.delete(id);
  }
}

reqWs.addEventListener("close", () => rejectAll(new Error("WebSocket disconnected")));
reqWs.addEventListener("error", () => rejectAll(new Error("WebSocket error")));

function waitWsOpen(ws) {
  if (ws.readyState === WebSocket.OPEN) return Promise.resolve();
  if (ws.readyState === WebSocket.CLOSING || ws.readyState === WebSocket.CLOSED) {
    return Promise.reject(new Error("WebSocket is not open"));
  }
  return new Promise((resolve, reject) => {
    const onOpen = () => { cleanup(); resolve(); };
    const onClose = () => { cleanup(); reject(new Error("WebSocket disconnected")); };
    const onError = () => { cleanup(); reject(new Error("WebSocket error")); };
    const cleanup = () => {
      ws.removeEventListener("open", onOpen);
      ws.removeEventListener("close", onClose);
      ws.removeEventListener("error", onError);
    };
    ws.addEventListener("open", onOpen);
    ws.addEventListener("close", onClose);
    ws.addEventListener("error", onError);
  });
}

function newId() {
  // ミリ秒単位のタイムスタンプ＋32ビット乱数でざっくり一意のID生成（並行用）
  return `${Date.now()}-${crypto.getRandomValues(new Uint32Array(1))[0]}`;
}

export async function sendRequest(body) {
  await waitWsOpen(reqWs);

  const id = newId();
  const payload = { type: "req", id, body: String(body) };

  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      pending.delete(id);
      reject(new Error("Timeout"));
    }, TIMEOUT_MS);

    pending.set(id, { resolve, reject, timer });

    try {
      reqWs.send(JSON.stringify(payload));
    } catch (e) {
      clearTimeout(timer);
      pending.delete(id);
      reject(e instanceof Error ? e : new Error(String(e)));
    }
  });
}
