"use strict";

const button = document.querySelector("#send-button");
const messageContainer = document.getElementById("message-container");
button.addEventListener("click", (e) => {
  e.preventDefault();
  getMessageFromServer();
});
async function getMessageFromServer() {
  const messageElement = document.createElement("div");
  messageElement.className = "message";
  messageElement.textContent = "";
  messageContainer.appendChild(messageElement);

  // TODO: ここにサーバーとのやり取り等を実装しなさい
  // 通信中はボタンを非活性
  button.disabled = true;
  
  messageContainer.scrollTop = messageContainer.scrollHeight;

  // EventSource で SSE を受信（サーバは /message を提供）
  const es = new EventSource("http://localhost:3000/message");

  const finish = (reason) => {
    try {
      es.close();
    } catch {}
    button.disabled = false;

    // エラー発生時に理由を表示
    if (reason) {
      messageElement.textContent += `\n[${reason}]`;
    }
    messageContainer.scrollTop = messageContainer.scrollHeight;
  };

  es.onmessage = (event) => {
    // サーバは data: {"value":"...", "done":...} を送ってくる
    let payload;
    try {
      payload = JSON.parse(event.data);
    } catch {
      // 想定外の形式でもとりあえず表示
      messageElement.textContent += event.data;
      messageContainer.scrollTop = messageContainer.scrollHeight;
      return;
    }

    if (typeof payload.value === "string") {
      messageElement.textContent += payload.value;
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }

    if (payload.done === true) {
      finish(); // 正常終了
    }
  };

  es.onerror = () => {
    finish("error");
  };
}
