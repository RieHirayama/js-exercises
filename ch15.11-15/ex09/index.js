// 50 x 50 の盤面とする(サーバーと一致)
const ROWS = 50;
const COLS = 50;
// 1セルのサイズ
const RESOLUTION = 10;

const canvas = document.querySelector("#screen");
const ctx = canvas.getContext("2d");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");

canvas.width = ROWS * RESOLUTION;
canvas.height = COLS * RESOLUTION;

// NOTE: download from https://soundeffect-lab.info/sound/button/mp3/decision1.mp3
const sound = new Audio("./decision1.mp3");

// クライアントが保持するのは「最後に受信した盤面」
let grid = new Array(ROWS).fill(null).map(() => new Array(COLS).fill(false));
// ゲームの実行状況をサーバーと同期する（Start/Pauseボタンの有効/無効を制御）
let paused = true;

// grid を canvas に描画する
function renderGrid(grid) {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const cell = grid[row][col];
      ctx.beginPath();
      ctx.rect(col * RESOLUTION, row * RESOLUTION, RESOLUTION, RESOLUTION);
      ctx.fillStyle = cell ? "black" : "white";
      ctx.fill();
      ctx.stroke();
    }
  }
}

// ---- WebSocket ----
const ws = new WebSocket("ws://localhost:3003");

function setButtons() {
  startButton.disabled = !paused;
  pauseButton.disabled = paused;
}

ws.addEventListener("open", () => {
  // 接続できたら一旦ボタン状態を反映
  setButtons();
});

ws.addEventListener("message", (ev) => {
  let msg;
  try {
    msg = JSON.parse(ev.data);
  } catch {
    return;
  }

  switch (msg.type) {
    case "update": {
      // サーバから盤面を受信して描画
      grid = msg.grid;
      renderGrid(grid);
      break;
    }
    case "pause": {
      paused = true;
      setButtons();
      break;
    }
    case "start": {
      paused = false;
      setButtons();
      break;
    }
  }
});

ws.addEventListener("close", () => {
  // 切断時は操作不能に
  startButton.disabled = true;
  pauseButton.disabled = true;
});

ws.addEventListener("error", () => {
  startButton.disabled = true;
  pauseButton.disabled = true;
});

// ---- 操作（送信）----

// canvasクリック：ローカルで反転はしない（サーバにtoggle送る）
canvas.addEventListener("click", (evt) => {
  if (ws.readyState !== WebSocket.OPEN) return;

  const rect = canvas.getBoundingClientRect();
  const pos = { x: evt.clientX - rect.left, y: evt.clientY - rect.top };

  const row = Math.floor(pos.y / RESOLUTION);
  const col = Math.floor(pos.x / RESOLUTION);

  // 範囲外ガード
  if (row < 0 || row >= ROWS || col < 0 || col >= COLS) return;

  ws.send(JSON.stringify({ type: "toggle", row, col }));
  sound.cloneNode().play();
});

// Start / Pause：サーバに状態変更を依頼
startButton.addEventListener("click", () => {
  if (ws.readyState !== WebSocket.OPEN) return;
  ws.send(JSON.stringify({ type: "start" }));
});

pauseButton.addEventListener("click", () => {
  if (ws.readyState !== WebSocket.OPEN) return;
  ws.send(JSON.stringify({ type: "pause" }));
});


// 初期表示（接続前は空盤面）
renderGrid(grid);
setButtons();
