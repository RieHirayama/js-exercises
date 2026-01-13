# 問題16.13 回答

## Windows (WSL 不要)のコマンドでは、なぜ直接 dir を使わず cmd /c を書いているのだろうか？これらの意味は？
```
> cmd /c dir | cmd /c "findstr DIR"
```
- 意味： 
cmd /c dir でディレクトリ一覧を表示し、その出力をパイプで cmd /c "findstr DIR" に渡して、DIR を含む行のみを抽出して表示している。
- 理由： 
Windows における dir や findstr は実行ファイルではなく、cmd.exe の内部コマンドである。
本シェル実装は spawn により実行ファイルを起動するため、内部コマンドを直接実行することはできない。
そのため cmd /c を用いて cmd.exe を起動し、その内部でコマンドを実行させている。
/c は「指定したコマンドを実行後、cmd.exe を終了する」オプションである。

## 動作確認
```
> node shell.js
> cmd /c dir | cmd /c "findstr DIR"
2026/01/12  16:45    <DIR>          .
2026/01/12  16:33    <DIR>          ..
> cmd /c echo HELLO > hello.txt
> cmd /c type hello.txt
HELLO
```
