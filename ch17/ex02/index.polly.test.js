import { Polly } from "@pollyjs/core";
import FetchAdapter from "@pollyjs/adapter-fetch";
import FSPersister from "@pollyjs/persister-fs";

import { listIssues, createIssue, closeIssue } from "./index.js";

Polly.register(FetchAdapter);
Polly.register(FSPersister);

test("list/create/closeIssues with Polly 録画/再生", async () => {
  const mode = process.env.RECORD === "1" ? "record" : "replay";

  const ownerRepo = process.env.GITHUB_OWNER_REPO;
  const token = process.env.GITHUB_TOKEN;

  if (!ownerRepo) {
    throw new Error("環境変数 GITHUB_OWNER_REPO が必要です");
  }

  if (mode === "record" && !token) {
    throw new Error("RECORD=1 のときは GITHUB_TOKEN が必要です");
  }

  const polly = new Polly("github-issues", {
    adapters: ["fetch"],
    persister: "fs",
    persisterOptions: {
      fs: {
        recordingsDir: "./ex02/__recordings__",
      },
    },
    mode,
    recordIfMissing: mode === "record",
    matchRequestsBy: {
      headers: false,
    },
  });

  try {
    const issues = await listIssues(ownerRepo, {
      fetchFn: globalThis.fetch,
      token: token ?? "dummy",
    });

    const created = await createIssue(ownerRepo, {
      title: "polly test issue",
      fetchFn: globalThis.fetch,
      token: token ?? "dummy",
    });

    const closed = await closeIssue(ownerRepo, {
      number: created.number,
      fetchFn: globalThis.fetch,
      token: token ?? "dummy",
    });

    expect(Array.isArray(issues)).toBe(true);
    expect(created.number).toBeTruthy();
    expect(closed.number).toBe(created.number);
  } finally {
    await polly.stop();
  }
});
