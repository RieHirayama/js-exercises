import fs from "fs/promises";
import os from "os";
import path from "path";
import { checkEntry } from "./index.js";

describe("checkEntry", () => {
  let tempDir;
  let tempFile;

  beforeAll(async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "ex07-"));
    tempFile = path.join(tempDir, "sample.txt");
    await fs.writeFile(tempFile, "hello");
  });

  afterAll(async () => {
    if (tempDir) {
      await fs.rm(tempDir, { recursive: true, force: true });
    }
  });

  test("ファイルの場合", async () => {
    await expect(checkEntry(tempFile)).resolves.toBe("file");
  });

  test("ディレクトリの場合", async () => {
    await expect(checkEntry(tempDir)).resolves.toBe("directory");
  });

  test("存在しないパスの場合はrejectされる", async () => {
    const missing = path.join(tempDir, "missing.txt");
    await expect(checkEntry(missing)).rejects.toThrow(/ENOENT/);
  });
});
