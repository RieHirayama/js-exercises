import { spawn } from "node:child_process";
import net from "node:net";
import path from "node:path";
import { fileURLToPath } from "node:url";

const PORT = 18001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SERVER_ENTRY = path.join(__dirname, "index.js");

/** ポートに接続できるかを確認 */
function canConnect(port) {
  return new Promise((resolve) => {
    const s = net.createConnection({ port });
    s.once("connect", () => {
      s.destroy();
      resolve(true);
    });
    s.once("error", () => resolve(false));
  });
}

/** サーバ起動後、ポートが開くまで待つ */
async function waitForPortReady(port, timeoutMs = 8000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (await canConnect(port)) return;
    await new Promise((r) => setTimeout(r, 100));
  }
  throw new Error(`サーバが起動しませんでした: port=${port}`);
}

/** サーバを起動する */
async function startServer(port) {
  const child = spawn(process.execPath, [SERVER_ENTRY], {
    env: { ...process.env, PORT: String(port) },
    stdio: ["ignore", "ignore", "pipe"],
  });

  await waitForPortReady(port);
  return child;
}

/** 生のHTTPリクエストを送って、生のレスポンス文字列を返す */
function request(port, raw) {
  return new Promise((resolve, reject) => {
    const socket = net.createConnection({ port }, () => {
      socket.write(raw);
    });

    let response = "";
    socket.on("data", (chunk) => (response += chunk.toString()));
    socket.on("end", () => resolve(response));
    socket.on("error", reject);

    // 念のためのタイムアウト
    socket.setTimeout(5000, () => socket.destroy(new Error("timeout")));
  });
}

describe("net http serverテスト", () => {
  let child;

  beforeAll(async () => {
    child = await startServer(PORT);
  }, 15000);

  afterAll(() => {
    child?.kill();
  });

  test("GET / はフォームHTMLを返す", async () => {
    const res = await request(PORT, "GET / HTTP/1.1\r\nHost: x\r\n\r\n");
    expect(res).toContain("HTTP/1.1 200");
    expect(res).toContain('<form action="/greeting" method="POST">');
  });

  test("POST /greeting は name と greeting を含むHTMLを返す", async () => {
    const body = "name=Alice&greeting=Hello";
    const res = await request(
      PORT,
      [
        "POST /greeting HTTP/1.1",
        "Host: x",
        "Content-Type: application/x-www-form-urlencoded",
        `Content-Length: ${Buffer.byteLength(body)}`,
        "",
        body,
      ].join("\r\n")
    );

    expect(res).toContain("HTTP/1.1 200");
    expect(res).toContain("Name: Alice");
    expect(res).toContain("Greeting: Hello");
  });

  test("GET /missing は 404 を返す", async () => {
    const res = await request(PORT, "GET /missing HTTP/1.1\r\nHost: x\r\n\r\n");
    expect(res).toContain("HTTP/1.1 404");
  });

  test("GET /greeting は 405 を返す", async () => {
    const res = await request(PORT, "GET /greeting HTTP/1.1\r\nHost: x\r\n\r\n");
    expect(res).toContain("HTTP/1.1 405");
  });
});