# 問題8.3

書籍 8.2.1 の 「再帰関数とスタック」には、関数が自身を数千回呼び出した場合はエラーが発生すると書かれている。

## 1

プログラミング言語や処理系によっては、再帰呼び出しを関数の処理の末尾にする(末尾再帰)ことで、スタックオーバーフローが起こらないよう最適化できるものがある。末尾再帰は何故そのような最適化ができるのか答えなさい。

### 回答

末尾再帰では、関数の最後の処理が再帰呼び出しであるため、現在の関数の実行状態を残しておく必要がなく、スタックに処理が積まれないので、スタックが増えず、オーバーフローを回避できる。

## 2

JavaScript で末尾再帰最適化を実装している処理系を答えなさい。  
利用できる環境があれば、実際に以下の URL を表示・実行してエラーが発生しないことを確認しなさい。
https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABMAhtOAnGKA2AKMALkTBAFsAjAUwwEpEBvAWAChFlxp4kYoa8ADhjgATENGKlKNADSIIccHwyTy1Oo1bt2MYIjwKlNRAD4S9Zm23sMVKCAxIho8VADcW7QF9PNuw55lQWExaEQAKnlFMGU5QxjjAGpEAEZaDysfK1t7R0RefhS5NIys1gUwAGc4HCoAOhw4AHM8VHQsXDwUgAZe3tp01iA

### 回答

safariにて実装されている。
chromeなどその他主なブラウザでは実装されていない。

### 確認結果：

- safari  
  環境持ってない

- chrome  
  実行すると、以下エラーが発生。  
  「[ERR]: Maximum call stack size exceeded」
