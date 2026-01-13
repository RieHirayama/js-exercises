// Express を使って、課題のサンプルと同等の HTTP サーバを実装する

import express from "express";
import http from "http";

// 指定されたディレクトリからファイルを配信する Express アプリを作成して返す
export function createApp(rootDirectory) {
  const app = express();

  // /test/mirror　エンドポイントの処理　（受信したリクエストをそのままレスポンスとして返す）
  app.all("/test/mirror", (req, res) => {
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.status(200);

    // リクエストライン
    // 例: POST /test/mirror HTTP/1.1
    res.write(
      `${req.method} ${req.originalUrl} HTTP/${req.httpVersion}\r\n`
    );

    // 受信したヘッダをすべて返す
    // rawHeaders は [key, value, key, value, ...] の配列
    const headers = req.rawHeaders ?? [];
    for (let i = 0; i < headers.length; i += 2) {
      res.write(`${headers[i]}: ${headers[i + 1]}\r\n`);
    }

    // ヘッダとボディの区切り
    res.write("\r\n");

    // リクエストボディをそのままレスポンスへ流す
    req.pipe(res);
  });

  // /test/mirror 以外のパスは静的ファイルとして処理する
  // express.staticを使うとこれ1行で、rootDirectory 配下のファイルを配信してくれる
  app.use(express.static(rootDirectory));

  // 存在しないファイルへのアクセスは 404 を返すようにする(express.static で見つからない場合)
  app.use((req, res) => {
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.status(404).end("Not Found");
  });

  return app;
}

// CLIで node index.js <rootDirectory> <port> で起動された場合のみサーバを立てる
// テストでimportされた場合はサーバを立てない
if (process.argv[1].endsWith("index.js")) {
  const rootDirectory = process.argv[2] || "/tmp";
  const port = Number(process.argv[3]) || 8000;

  const app = createApp(rootDirectory);
  const server = http.createServer(app);

  server.listen(port, () => {
    console.log("Listening on port", port);
    console.log("rootDirectory:", rootDirectory);
  });
}
