const API_BASE = "https://api.github.com";

// owner/repo 形式のチェック
export function parseOwnerRepo(ownerRepo) {
  if (!ownerRepo || !ownerRepo.includes("/")) {
    throw new Error("owner/repo の形式で指定してください");
  }
  const [owner, repo] = ownerRepo.split("/", 2);
  return { owner, repo };
}

// GitHub API にリクエストして JSON を返す
export async function requestJson({
  fetchFn,
  token,
  method,
  url,
  body,
  verbose = false,
}) {
  if (!token) throw new Error("token が必要です");

  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  if (body) headers["Content-Type"] = "application/json";

  const res = await fetchFn(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  const json = text ? JSON.parse(text) : null;

  if (!res.ok) {
    throw new Error(`GitHub API エラー: ${json?.message ?? "unknown"}`);
  }

  return json;
}

// list コマンド
export async function listIssues(ownerRepo, { fetchFn, token }) {
  const { owner, repo } = parseOwnerRepo(ownerRepo);
  const url = `${API_BASE}/repos/${owner}/${repo}/issues?state=open`;

  return requestJson({ fetchFn, token, method: "GET", url });
}

// create コマンド
export async function createIssue(
  ownerRepo,
  { title, body, fetchFn, token }
) {
  if (!title) throw new Error("title が必要です");

  const { owner, repo } = parseOwnerRepo(ownerRepo);
  const url = `${API_BASE}/repos/${owner}/${repo}/issues`;

  return requestJson({
    fetchFn,
    token,
    method: "POST",
    url,
    body: { title, body },
  });
}

// close コマンド
export async function closeIssue(
  ownerRepo,
  { number, fetchFn, token }
) {
  if (!number) throw new Error("number が必要です");

  const { owner, repo } = parseOwnerRepo(ownerRepo);
  const url = `${API_BASE}/repos/${owner}/${repo}/issues/${number}`;

  return requestJson({
    fetchFn,
    token,
    method: "PATCH",
    url,
    body: { state: "closed" },
  });
}

// CLI実行用の main 関数
async function main() {
  const [command, ownerRepo, ...rest] = process.argv.slice(2);
  const token = process.env.GITHUB_TOKEN;

  if (!command) {
    console.log("Usage: node index.js <list|create|close> owner/repo");
    process.exit(1);
  }

  const fetchFn = globalThis.fetch;

  if (command === "list") {
    const issues = await listIssues(ownerRepo, { fetchFn, token });
    issues.forEach((i) => console.log(`#${i.number} ${i.title}`));
  }

  if (command === "create") {
    const title = rest[1];
    const issue = await createIssue(ownerRepo, {
      title,
      fetchFn,
      token,
    });
    console.log(`Created: #${issue.number}`);
  }

  if (command === "close") {
    const number = rest[1];
    await closeIssue(ownerRepo, { number, fetchFn, token });
    console.log(`Closed #${number}`);
  }
}

// CLI実行時のみ動かす（テストや他ファイルからの import では動かないようにするため）
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
