import net from "net";

const PORT = Number(process.env.PORT ?? 8000);

const formHtml = `<!doctype html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Greeting Form</title>
  </head>
  <body>
    <form action="/greeting" method="POST">
      <label for="greeting">Name:</label>
      <input type="text" id="name" name="name" />
      <input type="text" id="greeting" name="greeting" />
      <button type="submit">Submit</button>
    </form>
  </body>
</html>`;

function sendResponse(socket, { status = 200, reason = "OK", headers = {}, body = "" }) {
  const baseHeaders = {
    "Connection": "close",
    "Content-Length": Buffer.byteLength(body, "utf8"),
    ...headers,
  };

  const headerLines = Object.entries(baseHeaders).map(([k, v]) => `${k}: ${v}`);

  const res =
    `HTTP/1.1 ${status} ${reason}\r\n` +
    headerLines.join("\r\n") +
    `\r\n\r\n` +
    body;

  socket.write(res);
  socket.end();
}

function parseHttpRequest(raw) {
  // まだ全部届いてない可能性があるので、ヘッダ終端まで来ているか確認
  const headerEnd = raw.indexOf("\r\n\r\n");
  if (headerEnd === -1) return null;

  const head = raw.slice(0, headerEnd);
  const lines = head.split("\r\n");
  const [method, path, version] = lines[0].split(" ");

  const headers = {};
  for (let i = 1; i < lines.length; i++) {
    const idx = lines[i].indexOf(":");
    if (idx === -1) continue;
    const k = lines[i].slice(0, idx).trim().toLowerCase();
    const v = lines[i].slice(idx + 1).trim();
    headers[k] = v;
  }

  const contentLength = Number(headers["content-length"] ?? "0");
  const bodyStart = headerEnd + 4;

  // bodyが全部届いているか確認
  const totalNeeded = bodyStart + contentLength;
  if (raw.length < totalNeeded) return null;

  const body = raw.slice(bodyStart, totalNeeded);

  return { method, path, version, headers, body, consumed: totalNeeded };
}

function parseFormUrlEncoded(body) {
  const params = new URLSearchParams(body);
  return Object.fromEntries(params.entries());
}

const server = net.createServer((socket) => {
  socket.setEncoding("utf8");

  let buffer = "";

  socket.on("data", (chunk) => {
    buffer += chunk;

    const req = parseHttpRequest(buffer);
    if (!req) return; // まだ不足

    // 1リクエストだけ処理（Connection: close前提）
    const { method, path, headers, body } = req;

    // ルーティング（パス×メソッドで判断）
    if (path === "/") {
      if (method === "GET") {
        return sendResponse(socket, {
          status: 200,
          reason: "OK",
          headers: { "Content-Type": "text/html; charset=utf-8" },
          body: formHtml,
        });
      }
      // パスは合ってるけどメソッド違い => 405
      return sendResponse(socket, {
        status: 405,
        reason: "Method Not Allowed",
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Allow": "GET",
        },
        body: "405 Method Not Allowed",
      });
    }

    if (path === "/greeting") {
      if (method === "POST") {
        const data = parseFormUrlEncoded(body);
        const name = data.name ?? "";
        const greeting = data.greeting ?? "";

        const html = `<!doctype html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Greeting</title>
  </head>
  <body>
    <h1>Greeting</h1>
    <p>Name: ${name}</p>
    <p>Greeting: ${greeting}</p>
  </body>
</html>`;

        return sendResponse(socket, {
          status: 200,
          reason: "OK",
          headers: { "Content-Type": "text/html; charset=utf-8" },
          body: html,
        });
      }

      // パスは合ってるけどメソッド違い => 405
      return sendResponse(socket, {
        status: 405,
        reason: "Method Not Allowed",
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Allow": "POST",
        },
        body: "405 Method Not Allowed",
      });
    }

    // そもそもパスがない => 404
    return sendResponse(socket, {
      status: 404,
      reason: "Not Found",
      headers: { "Content-Type": "text/plain; charset=utf-8" },
      body: "404 Not Found",
    });
  });
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`listening on http://127.0.0.1:${PORT}`);
});
