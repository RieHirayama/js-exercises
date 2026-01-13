import { Worker, isMainThread, parentPort } from "worker_threads";

const N = 10_000_000;

if (isMainThread) {
  let num = 0;

  const worker = new Worker(new URL(import.meta.url));

  worker.on("message", (msg) => {
    if (msg === "inc") {
      num++;
    } else if (msg === "done") {
      console.log(num);
    }
  });

  worker.on("error", console.error);

  // メインスレッド側の加算
  for (let i = 0; i < N; i++) {
    num++;
  }
} else {
  // ワーカースレッド側
  for (let i = 0; i < N; i++) {
    parentPort.postMessage("inc");
  }
  parentPort.postMessage("done");
}
