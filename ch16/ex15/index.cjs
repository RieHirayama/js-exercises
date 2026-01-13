// CommonJS
const threads = require("worker_threads");

const N = 10_000_000;

if (threads.isMainThread) {
  let num = 0;

  const worker = new threads.Worker(__filename);

  // メイン側：サブスレッドから「numをインクリメントせよ」という指示を受けたら増やす
  worker.on("message", (msg) => {
    if (msg === "inc") {
      num++;
    } else if (msg === "done") {
      // "done" はサブ側が inc を送り切ったあとに送るので、
      // ここに来た時点でサブ側由来のインクリメントはすべて反映済み。
      console.log(num);
    }
  });

  worker.on("error", console.error);

  // メイン側：自分の分を num++ で加算
  for (let i = 0; i < N; i++) {
    num++;
  }
} else {
  // サブスレッド側：num を直接触れないので「増やして」とメインへ依頼する
  for (let i = 0; i < N; i++) {
    threads.parentPort.postMessage("inc");
  }
  threads.parentPort.postMessage("done");
}
