// レスポンス用クライアント
// 2. WebSocket サーバから転送されたリクエストメッセージを受信してレスポンスを返す実装をしなさい。
//    - レスポンス本文は、 リクエスト本文の先頭に `Hello, ` を付加したものを返すこと。
//    - どのリクエストに対するレスポンスか、リクエストした側で判別できるようにすること。

// 今回作成するものは、JSONで id（リクエストID）と type（req/res）を付ける方式にする。
// リクエスト側：{ type:"req", id:"...", body:"World" } を送る → idごとに Promise を待つ
// レスポンス側：type:"req" を受けたら Hello, ${body} を付けて type:"res" で返す（同じ id）
//
const WS_URL = "ws://localhost:3003";
const resWs = new WebSocket(WS_URL);

resWs.addEventListener("message", (ev) => {
  let msg;
  try {
    msg = JSON.parse(ev.data);
  } catch {
    return;
  }

  // リクエストだけ処理
  if (msg?.type !== "req" || typeof msg.id !== "string") return;

  const reqBody = String(msg.body ?? "");
  const response = {
    type: "res",
    id: msg.id,              // 受け取ったリクエストと同じidで返す
    body: `Hello, ${reqBody}`,
  };

  // レスポンスを送信
  resWs.send(JSON.stringify(response));
});
