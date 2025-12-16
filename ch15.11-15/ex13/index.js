const $ = (id) => document.getElementById(id);

const chatEl = $("chat");
const sendEl = $("send");
const promptEl = $("prompt");

let messages = []; // [{ role: "user"|"assistant", content: "..." }, ...]
let controller = null;

function addMessage(role, content) {
  const div = document.createElement("div");
  div.className = `msg ${role === "user" ? "user" : "assistant"}`;
  div.textContent = content;
  chatEl.appendChild(div);
  chatEl.scrollTop = chatEl.scrollHeight;
  return div;
}

// ジェネレータ関数
// NDJSON形式（1行ごとにJSON）を1行ずつパースして、for awaitループで順番に処理できるようにする
// Ollamaサーバーから送られる形式の例：
// {"message":{"role":"assistant","content":"こん"},"done":false}
// {"message":{"role":"assistant","content":"にちは"},"done":false}
// {"message":{"role":"assistant","content":""},"done":true}
async function* readNdjsonStream(response) {
  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");
  let buffer = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    // デコードしてバッファに追加
    buffer += decoder.decode(value, { stream: true });

    let idx;
    // 改行ごとに分割してJSONパース
    while ((idx = buffer.indexOf("\n")) >= 0) {
      const line = buffer.slice(0, idx).trim();
      buffer = buffer.slice(idx + 1);

      if (!line) continue;
      yield JSON.parse(line);
    }
  }

  // 残りがあれば最後に処理
  const rest = buffer.trim();
  if (rest) yield JSON.parse(rest);
}

async function sendChat() {
  const apiUrl = "http://127.0.0.1:11434/api/chat";
  const model = "gemma:2b"
  const prompt = promptEl.value.trim();

  if (!prompt) {
    return;
  }

  promptEl.value = "";
  // API呼び出し中は多重送信防止
  sendEl.disabled = true;

  // ユーザ発言枠
  addMessage("user", prompt);
  messages.push({ role: "user", content: prompt });

  // 応答枠（逐次追記、最初は空で作成）
  const assistantDiv = addMessage("assistant", "");
  let assistantText = "";

  controller = new AbortController();

  try {
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        model,
        messages,
        // stream はデフォルト true（逐次）とのことだが、念のため指定
        stream: true,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`HTTP ${res.status} ${res.statusText}\n${text}`);
    }

    // ストリームを逐次表示：{ message: { role, content }, done: boolean, ... } が流れてくる
    // :contentReference[oaicite:2]{index=2}
    // サーバーからの応答が完了したら done: true のチャンクが来る
    // サーバーからチャンクが到着するたびに表示を更新
    for await (const chunk of readNdjsonStream(res)) {
      const delta = chunk?.message?.content ?? "";
      if (delta) {
        assistantText += delta;
        assistantDiv.textContent = assistantText;
        chatEl.scrollTop = chatEl.scrollHeight;
      }
      if (chunk?.done) break;
    }

    messages.push({ role: "assistant", content: assistantText });

  } catch (e) {
    if (e?.name === "AbortError") {
      return;
    }
    assistantDiv.textContent = `❌ ${e instanceof Error ? e.message : String(e)}`;
  } finally {
    controller = null;
    sendEl.disabled = false;
  }
}

sendEl.addEventListener("click", sendChat);

promptEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
    sendChat();
  }
});
