# 問題16.7 memo

## file, directory以外を返すパターンの必要性

ファイルシステムに存在するエントリは、ファイルとディレクトリだけではなく、以下が存在する。
そのため、他のエントリも存在するということを考慮した実装必要。
※シンボリックリンクはfs.statではそのリンク先で判定される。（リンクかどうかを判定するにはfs.lstatを使うと良い）

- `fs.stat` で取得できるエントリの種類
  - ファイル (isFile())
  - ディレクトリ (isDirectory())
  - シンボリックリンク (isSymbolicLink())
  - ソケット (isSocket())
  - FIFO/パイプ (isFIFO())
  - ブロックデバイス (isBlockDevice())
  - キャラクタデバイス (isCharacterDevice())

## 補足）それぞれの説明
1. ファイル (isFile())
通常のテキスト、画像、実行ファイルなどのデータが格納される最小単位
最も一般的なエントリ
2. ディレクトリ (isDirectory())
ファイルやディレクトリを格納する容器
フォルダとも呼ばれる
3. シンボリックリンク (isSymbolicLink())
他のファイルやディレクトリへのショートカット
Linux/Mac での ln -s コマンドで作成
Windows でのショートカット（.lnk）も似ている概念
4. ソケット (isSocket())
ネットワーク通信やプロセス間通信(IPC)用のエンドポイント
/var/run/ などに存在（Linux/Mac）
5. FIFO/パイプ (isFIFO())
名前付きパイプ
プロセス間でデータを順序立てて受け渡すために使用
mkfifo コマンドで作成
6. ブロックデバイス (isBlockDevice())
ディスク、USB メモリなどの物理デバイス
/dev/sda など（Linux）
7. キャラクタデバイス (isCharacterDevice())
ターミナル、シリアルポート、メモリなど
/dev/tty など（Linux）
