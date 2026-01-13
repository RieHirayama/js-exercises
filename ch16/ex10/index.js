// HTTPサーバー
// 指定されたディレクトリからファイルを提供する
// /test/mirror エンドポイントでは受信したリクエストをそのままレスポンスとして返す
// ファイルをストリーミングでアップロードも可能
import http from "http";
import url from "url";
import path from "path";
import fs from "fs";

function serve(rootDirectory, port) {
  let server = new http.Server();
  server.listen(port);
  console.log("Listening on port", port);

  // リクエストが届いたら、この関数で処理を行う
  server.on("request", (request, response) => {
    let endpoint = url.parse(request.url).pathname;

    if (endpoint === "/test/mirror") {
      response.setHeader("Content-Type", "text/plain; charset=utf-8");
      response.writeHead(200);
      response.write(`${request.method} ${request.url} HTTP/${request.httpVersion}\r\n`);

      let headers = request.rawHeaders;
      for (let i = 0; i < headers.length; i += 2) {
        response.write(`${headers[i]}: ${headers[i + 1]}\r\n`);
      }

      response.write("\r\n");
      request.pipe(response);

      return;
    }
    
    // PUTメソッドの場合、ファイルをストリームで保存する
    if (request.method === "PUT") {
      let filename = endpoint.substring(1); // 先頭のスラッシュを削除
      filename = filename.replace(/\.\./g, ""); // ディレクトリの外へのアクセスを防止
      filename = path.resolve(rootDirectory, filename);

      // 保存先ディレクトリを作る（foo/bar のような階層に対応）
      const dir = path.dirname(filename);
      fs.promises
        .mkdir(dir, { recursive: true })
        .then(() => {
          // 受信データをそのままファイルへ書き込む
          const out = fs.createWriteStream(filename);

          // 書き込みエラー（権限やディスクフルなど）
          out.on("error", (err) => {
            response.setHeader("Content-Type", "text/plain; charset=utf-8");
            response.writeHead(500);
            response.end(err.message);
          });

          // リクエスト側のエラー（接続断など）
          request.on("error", (err) => {
            response.setHeader("Content-Type", "text/plain; charset=utf-8");
            response.writeHead(400);
            response.end(err.message);
          });

          // 重要：request → out に流す（ストリーム）
          request.pipe(out);

          // 書き込み完了したら 200 を返す
          out.on("finish", () => {
            response.setHeader("Content-Type", "text/plain; charset=utf-8");
            response.writeHead(200);
            response.end("OK\n");
          });
        })
        .catch((err) => {
          response.setHeader("Content-Type", "text/plain; charset=utf-8");
          response.writeHead(500);
          response.end(err.message);
        });

      return;
    }
    
    // GET：ファイル配信（例そのまま）
    if (request.method === "GET" || request.method === "HEAD") {
      let filename = endpoint.substring(1); // 先頭のスラッシュを削除
      filename = filename.replace(/\.\./g, ""); // ディレクトリの外へのアクセスを防止
      filename = path.resolve(rootDirectory, filename);

      let type;
      switch (path.extname(filename)) {
        case ".html":
        case ".htm":
          type = "text/html"; break;
        case ".js":
          type = "text/javascript"; break;
        case ".css":
          type = "text/css"; break;
        case ".png":
          type = "image/png"; break;
        case ".txt":
          type = "text/plain"; break;
        default:
          type = "application/octet-stream"; break;
      }

      let stream = fs.createReadStream(filename);
      stream.once("readable", () => {
        response.setHeader("Content-Type", type + "; charset=utf-8");
        response.writeHead(200);
        stream.pipe(response);
      });

      stream.on("error", (err) => {
        response.setHeader("Content-Type", "text/plain; charset=utf-8");
        response.writeHead(404);
        response.end(err.message);
      });

      return;
    }

    // その他のメソッドは 405 を返す
    response.setHeader("Content-Type", "text/plain; charset=utf-8");
    response.writeHead(405);
    response.end("Method Not Allowed\n");
  });
}

serve(process.argv[2] || "/tmp", parseInt(process.argv[3]) || 8000);