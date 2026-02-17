## 問題 17.7 🖋

TypeScriptのトランスパイルは`@babel/preset-typescript`や`tsc`によって可能だが、それぞれの違いを調べなさい。

## 回答
@babel/preset-typescript は TypeScript の型を取り除いて JavaScript に変換するが、型チェックは行わない。  
一方 tsc は TypeScript の公式コンパイラであり、トランスパイルに加えて型チェックや型定義ファイル（.d.ts）の生成なども行える。  
実務では、変換を高速に行うため Babel を使い、型の正しさは tsc --noEmit （出力なしで型だけチェック）で検証する、といった併用構成も多い。

- Babel（@babel/preset-typescript）
TypeScriptの「型」を取り除いてJavaScriptにするのが得意（高速）。  
ただし 型チェックはしない。  

- tsc（TypeScript Compiler）
トランスパイルだけでなく 型チェックもする。  
TypeScriptの公式コンパイラなので機能が最も揃っている。  