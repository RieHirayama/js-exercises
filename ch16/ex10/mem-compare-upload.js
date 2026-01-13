import fs from "fs";

function rssMB() {
  return Math.round((process.memoryUsage().rss / 1024 / 1024) * 10) / 10; //小数点第1位で丸める
}

async function uploadByStream() {
  console.log("\n[stream] start rss(MB)=", rssMB());

  const res = await fetch("http://localhost:8000/up/stream.txt", {
    method: "PUT",
    body: fs.createReadStream("file.txt"),
    duplex: "half",
  });

  console.log("[stream] status=", res.status, "rss(MB)=", rssMB());
  await res.text();
  console.log("[stream] end   rss(MB)=", rssMB());
}

async function uploadByReadFile() {
  console.log("\n[readFile] start rss(MB)=", rssMB());

  // ファイル全体をメモリに載せる
  const buf = await fs.promises.readFile("file.txt");

  console.log("[readFile] after readFile rss(MB)=", rssMB());

  const res = await fetch("http://localhost:8000/up/readfile.txt", {
    method: "PUT",
    body: buf, // バッファを丸ごと送る
    duplex: "half",
  });

  console.log("[readFile] status=", res.status, "rss(MB)=", rssMB());
  await res.text();
  console.log("[readFile] end   rss(MB)=", rssMB());
}

(async () => {
  await uploadByStream();
  await uploadByReadFile();
})();
