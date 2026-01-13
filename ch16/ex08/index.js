// 環境変数 GITHUB_TOKEN にアクセストークンが設定されていること

const API_BASE = "https://api.github.com";

/* ---------------------------
 * ヘルプ表示
 * --------------------------- */
function printHelp(exitCode = 0) {
  console.log(`
*** GitHub の REST API を利用して Issue を操作するコマンドラインツール ***

使い方:
  node index.js <command> <owner/repo> [options]

コマンド:
  list   <owner/repo>
         openなIssueの番号とタイトルを表示

  create <owner/repo> --title "<タイトル>" [--body "<本文>"]
         Issueを作成

  close  <owner/repo> --number <番号>
         Issueをクローズ

オプション:
  -h, --help     ヘルプを表示
  -v, --verbose  HTTPリクエスト/レスポンスを表示

環境変数:
  GITHUB_TOKEN   GitHubのアクセストークンを設定してください。
                  PowerShell例: $env:GITHUB_TOKEN="ghp_xxx"
`);
  process.exit(exitCode);
}

/* ---------------------------
 * エラー表示して終了
 * --------------------------- */
function fail(message, exitCode = 1) {
  console.error(`${message}`);
  process.exit(exitCode);
}

/* ---------------------------
 * owner/repo 形式のチェック
 * --------------------------- */
function parseOwnerRepo(ownerRepo) {
  if (!ownerRepo || !ownerRepo.includes("/")) {
    fail("owner/repo の形式で指定してください");
  }
  const [owner, repo] = ownerRepo.split("/", 2);
  return { owner, repo };
}

/* ---------------------------
 * コマンドライン引数をパース
 * --------------------------- */
function parseArgs(argv) {
  const positionals = [];
  const options = new Map();

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];

    // ヘルプ表示
    if (arg === "-h" || arg === "--help") {
      options.set("help", true);
      continue;
    }

    // HTTPログ出力
    if (arg === "-v" || arg === "--verbose") {
      options.set("verbose", true);
      continue;
    }

    // オプション引数
    if (arg.startsWith("--")) {
      const eq = arg.indexOf("=");
      if (eq !== -1) {
        options.set(arg.slice(2, eq), arg.slice(eq + 1));
      } else {
        options.set(arg.slice(2), argv[++i]);
      }
      continue;
    }

    // それ以外は通常の位置引数
    positionals.push(arg);
  }

  return { positionals, options };
}

/* ---------------------------
 * トークン取得
 * --------------------------- */
function getToken() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    fail(
      "環境変数 GITHUB_TOKEN が設定されていません。\n" +
      "PowerShell例: $env:GITHUB_TOKEN=\"ghp_xxx\""
    );
  }
  return token;
}

/* ---------------------------
 * リクエスト関数（GitHubにfetch を使ってHTTP通信）
 * --------------------------- */
async function requestJson({ method, url, body, verbose }) {
  const token = getToken();

  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  if (body) {
    headers["Content-Type"] = "application/json";
  }

  if (verbose) {
    console.log("---- HTTP REQUEST ----");
    console.log(method, url);
    console.log("body:", body ?? "(none)");
  }

  const response = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await response.text();
  const json = text ? JSON.parse(text) : null;

  if (verbose) {
    console.log("---- HTTP RESPONSE ----");
    console.log("status:", response.status);
    console.log(json);
  }

  if (!response.ok) {
    fail(`GitHub API エラー: ${json?.message}`);
  }

  return json;
}

/* ---------------------------
 * list コマンド
 * --------------------------- */
async function listIssues(ownerRepo, verbose) {
  const { owner, repo } = parseOwnerRepo(ownerRepo);

  const url = `${API_BASE}/repos/${owner}/${repo}/issues?state=open`;
  const issues = await requestJson({ method: "GET", url, verbose });

  if (issues.length === 0) {
    console.log("openなIssueはありません");
    return;
  }

  for (const issue of issues) {
    console.log(`#${issue.number} ${issue.title}`);
  }
}

/* ---------------------------
 * create コマンド
 * --------------------------- */
async function createIssue(ownerRepo, title, body, verbose) {
  if (!title) {
    fail("create には --title が必須です");
  }

  const { owner, repo } = parseOwnerRepo(ownerRepo);
  const url = `${API_BASE}/repos/${owner}/${repo}/issues`;

  const issue = await requestJson({
    method: "POST",
    url,
    body: { title, body },
    verbose,
  });

  console.log(`Issue作成: #${issue.number}`);
  console.log(issue.html_url);
}

/* ---------------------------
 * close コマンド
 * --------------------------- */
async function closeIssue(ownerRepo, number, verbose) {
  if (!number) {
    fail("close には --number が必須です");
  }

  const { owner, repo } = parseOwnerRepo(ownerRepo);
  const url = `${API_BASE}/repos/${owner}/${repo}/issues/${number}`;

  const issue = await requestJson({
    method: "PATCH",
    url,
    body: { state: "closed" },
    verbose,
  });

  console.log(`Issueクローズ: #${issue.number}`);
}

/* ---------------------------
 * メイン処理
 * --------------------------- */
async function main() {
  const { positionals, options } = parseArgs(process.argv.slice(2));

  // 引数にヘルプ表示があるか、コマンドが指定されていない場合はヘルプ表示
  if (options.get("help") || positionals.length === 0) {
    printHelp();
  }

  const command = positionals[0];
  const ownerRepo = positionals[1];
  const verbose = options.get("verbose");

  if (command === "list") {
    await listIssues(ownerRepo, verbose);
  } else if (command === "create") {
    await createIssue(
      ownerRepo,
      options.get("title"),
      options.get("body"),
      verbose
    );
  } else if (command === "close") {
    await closeIssue(ownerRepo, options.get("number"), verbose);
  } else {
    fail(`不明なコマンド: ${command}`);
  }
}

main();
