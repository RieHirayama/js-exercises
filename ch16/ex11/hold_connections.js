import net from "net";

const HOST = "127.0.0.1";
const PORT = 8000;

const sockets = []; // ← ここでソケットを保持
let ok = 0;
let fail = 0;

function one() {
  const s = net.createConnection({ host: HOST, port: PORT });

  s.on("connect", () => {
    ok++;
    sockets.push(s);  // ← ソケットを配列に追加（ガベージコレクションされない）
    if (ok % 100 === 0) console.log("connected:", ok);
    // 何も送らず維持
    // ← s.close() や s.end() を呼んでない
    // ← データも送信していない
    // → 接続がオープンのまま維持される
    one(); // 次の接続へ
  });

  s.on("error", (e) => {
    fail++;
    console.log("FAILED at", ok + fail, "ok=", ok, "fail=", fail, "err=", e.code);
    // 失敗したら止める（環境の限界点）
  });
}

one();
