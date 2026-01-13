// Supertest を使ってテスト
// （テストランナーはJest + HTTP リクエストの検証Supertest）
import os from "node:os";
import path from "node:path";
import fs from "node:fs/promises";
import request from "supertest";

import { createApp } from "./index.js";

describe("指定されたディレクトリからファイルを配信する Express サーバーのテスト", () => {
  test("静的ファイルが取得できる（txt）", async () => {
    // 一時ディレクトリを作成し、その中にテキストファイルを作成
    // C:\Users\...\AppData\Local\Temp\express-test-*****\hello.txt
    const dir = await fs.mkdtemp(path.join(os.tmpdir(), "express-test-"));
    await fs.writeFile(path.join(dir, "hello.txt"), "Hello File", "utf8");

    const app = createApp(dir);

    const res = await request(app).get("/hello.txt");

    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/^text\/plain/);
    expect(res.text).toBe("Hello File");
  });

  test("存在しないファイルは 404 になる", async () => {
    const dir = await fs.mkdtemp(path.join(os.tmpdir(), "express-test-"));
    const app = createApp(dir);

    const res = await request(app).get("/no-such-file.txt");

    expect(res.status).toBe(404);
    expect(res.text).toBe("Not Found");
  });

  test("/test/mirror がリクエスト内容を返す", async () => {
    const dir = await fs.mkdtemp(path.join(os.tmpdir(), "express-test-"));
    const app = createApp(dir);

    const res = await request(app)
      .post("/test/mirror")
      .set("X-Test", "123")
      .send("abc");

    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/^text\/plain/);

    // リクエストライン（先頭行、HTTP/は前方部分のみ一致確認）
    expect(res.text.startsWith("POST /test/mirror HTTP/")).toBe(true);

    // ヘッダが含まれている
    expect(res.text).toContain("X-Test: 123");

    // 空行のあとにボディ
    expect(res.text).toContain("\r\n\r\nabc");
  });
});
