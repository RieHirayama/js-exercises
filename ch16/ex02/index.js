import { spawn } from "child_process";
import path from "path";

// ESMでこのファイルの絶対パスとして__dirnameを定義するイディオム
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// startChildで起動したプロセスの参照
let child = null;

// node ./child.js を起動し、このプロセスが終了したときに解決するPromiseを返す
// cf. https://nodejs.org/api/child_process.html#event-close
async function startChild() {
  const childPath = path.join(__dirname, "child.js");
  child = spawn("node", [childPath]);

  child.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  child.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  return new Promise((res) => {
    child.on("close", (code, signal) => {
      res([code, signal]);
    });
  });
}

// TODO: ここに処理を書く
// ---- supervisor ----
const signals = ["SIGINT", "SIGBREAK", "SIGTERM"];
let shuttingDown = false;
let pendingSignal = null;

// 親の情報出力（動作確認のための情報）
console.log(`[parent] pid=${process.pid}`);
console.log(
  `[parent] test command examples:\n` +
    `  node -e "process.kill(${process.pid}, 'SIGBREAK')"\n` +  
    `  node -e "process.kill(${process.pid}, 'SIGTERM')"\n` +
    `  node -e "process.kill(${process.pid}, 'SIGINT')"`
);

const handleSignal = (signal) => {
  if (shuttingDown) return;
  shuttingDown = true;
  pendingSignal = signal;

  console.log(`[parent] received ${signal}. forwarding to child...`);
  console.log(
    `[parent] child status: ${child?.pid ? `pid=${child.pid}, killed=${child.killed}` : "no child yet"}`
  );

  // 子がいれば同じシグナルを送る
  if (child && child.pid && !child.killed) {
    child.kill(signal);
  }
};

signals.forEach((signal) => {
  process.on(signal, () => handleSignal(signal));
});

async function supervise() {
  while (true) {
    const startAt = new Date().toISOString();

    // startChild() は child を更新するので、その直後にPIDをログ
    const wait = startChild();
    console.log(`[parent] spawned child pid=${child.pid} at ${startAt}`);

    // シグナル受信済み（shuttingDown）なら、spawn直後に必ず転送
    if (shuttingDown && pendingSignal && child?.pid) {
      console.log(`[parent] forwarding pending ${pendingSignal} to newly spawned child...`);
      try {
        child.kill(pendingSignal);
      } catch (e) {
        console.error("[parent] failed to forward pending signal:", e);
      }
    }

    const [code, signal] = await wait;
    console.log(`[parent] child closed: code=${code}, signal=${signal}`);

    // WindowsでCtrl+C相当で落ちたときの終了コード (0xC000013A)
    const WIN_CTRL_C_EXIT_CODE = 0xC000013A; // 3221225786

    // 親がシグナル処理中なら、子がそのシグナルで死んだことを確認して親も終了
    if (shuttingDown) {
      const terminatedByExpectedSignal =
        signal === pendingSignal ||
        (process.platform === "win32" &&
          pendingSignal === "SIGINT" &&
          code === WIN_CTRL_C_EXIT_CODE);

      if (terminatedByExpectedSignal) {
        console.log(
          `[parent] child terminated by ${pendingSignal} (signal=${signal}, code=${code}). parent exiting.`
        );
        process.exit(0);
      } else {
        console.error(
          `[parent] Expected child to terminate by ${pendingSignal}, but got signal=${signal}, code=${code}`
        );
        process.exit(1);
      }
    }

    // 子がシグナルで落ちた場合は異常扱いで再起動
    if (signal) {
      console.log(`[parent] child terminated by signal ${signal}. restarting...`);
      continue;
    }

    // 異常終了なら再起動
    if (code !== 0) {
      console.log(`[parent] child exited with code ${code}. restarting...`);
      continue;
    }

    console.log("[parent] child exited normally. parent exiting.");
    break;
  }
}

supervise().catch((e) => {
  console.error("[parent] supervise error:", e);
  process.exit(1);
});