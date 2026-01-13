# 問題16.9 memo

## Expressとは？

Express は Node.js 用の Web フレームワーク。

### Node 標準 http モジュールの課題

Node.js の http.createServer() は低レベルで自由度が高い反面、以下の課題がある：

- URLごとのルーティング（分岐処理）を自分で実装する必要がある
- HTTP ステータスコード、Content-Type などのヘッダ設定を毎回書く必要がある
- JSON やフォームデータの解析を手動で行う必要がある
- エラーハンドリングなどの処理が毎回必要になる

### Express の特徴

Express はこれらの課題を解決するフレームワークで、以下の利点がある：

- `app.get()`, `app.post()` などのメソッドでエンドポイントを簡潔に定義できる
- `req`, `res` は Node 標準に近いため、既知の知識が活かせる
- ルーティング、ミドルウェア、エラー処理などが整備されている
- 実務でも広く使われている定番フレームワークである

## Supertestとは？

Supertest は Express アプリケーション用のテストライブラリ。

### HTTP テストの課題

Express アプリの HTTP 通信をテストする場合、通常は以下のような煩雑な処理が必要になる：

- サーバをポート（8000など）で起動する
- テスト実行時に別プロセスから HTTP リクエストを送信する
- テスト完了後にサーバを停止する

### Supertest の特徴

Supertest はこれらの課題を解決するライブラリで、以下の利点がある：

- Express アプリに対して HTTP リクエストを「擬似的に」投げられる
- `request(app).get("/path")` のような簡潔な記述でリクエストを送信できる
- ポート指定やサーバの起動・停止が不要である
- テストが高速で安定しており、並列実行にも適している
- Jest などのテストフレームワークと組み合わせやすい

## 備考

実行には express と supertest が必要
（未導入だったため npm install express supertest を実行）

## 動作確認

<ターミナルA>

> node index.js .
> Listening on port 8000
> rootDirectory: .

<ターミナルB>

> curl.exe -i http://localhost:8000/hello.txt

HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: text/plain; charset=utf-8
Date: Mon, 12 Jan 2026 01:07:37 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Transfer-Encoding: chunked

HELLO

ーーー

> "abc" | curl.exe -s -H "X-Test: 123" --data-binary "@-" http://localhost:8000/test/mirror

POST /test/mirror HTTP/1.1
Host: localhost:8000
User-Agent: curl/8.16.0
Accept: _/_
X-Test: 123
Content-Length: 5
Content-Type: application/x-www-form-urlencoded

abc
