## 問題 9.9

「SOLID 原則」とは、オブジェクト指向の設計原則として従うべき 5 つの原則である。

- 単一責任の原則 (single-responsibility principle)
- 開放閉鎖の原則（open/closed principle）
- リスコフの置換原則（Liskov substitution principle）
- インターフェース分離の原則 (Interface segregation principle)
- 依存性逆転の原則（dependency inversion principle）

1. これら 5 つの原則についてそれぞれ説明しなさい
2. 5 つの原則から任意の 1 つ以上を選び、原則を満たさないコードと原則を満たすコードの例を書きなさい
   - コードは各原則を説明するためのスケルトンコードで良く、実際に動作する必要はない

### 回答

- 単一責任の原則 (single-responsibility principle)  
  1つのクラスは、1つの責任（目的）だけを持つべき。
  「やることを1つだけ」に絞ることで保守性を保つ。複数のことをやらせると、変更の理由が増え、保守性が下がる。

- 開放閉鎖の原則（open/closed principle）  
  クラスは拡張に対して開かれており、修正に対して閉じているべき。
  「既存コードは変更せずに、新しい機能を追加できる」ように設計すべき。

- リスコフの置換原則（Liskov substitution principle）  
  派生クラスは、基底クラスと置き換えても正しく動作するべき。
  親クラスのインスタンスの代わりに、子クラスのインスタンスを使ってもプログラムが正しく動作するべき。

- インターフェース分離の原則 (Interface segregation principle)  
  クライアントは、使わない機能への依存を強制されるべきでない。
  必要な機能だけを持つ小さなインターフェースに分けるべき。

- 依存性逆転の原則（dependency inversion principle）  
  高レベルのモジュールは、低レベルのモジュールに依存すべきではない。両者は抽象に依存すべき。
  上位の処理ロジックが、下位の具体的な実装（DB・APIなど）に依存すると変更に弱くなる。

### 単一責任の原則の例

**原則を満たさないコード例**

```
class Report {
  constructor(data) {
    this.data = data;
  }

  generate() {
    // データ処理
  }

  saveToFile(filename) {
    // ファイル保存ロジック → 責任が2つ
  }
}

```

**原則を満たすコード例**

```
class Report {
  constructor(data) {
    this.data = data;
  }

  generate() {
    // データ処理のみ
  }
}

class ReportSaver {
  save(report, filename) {
    // 保存専用
  }
}
```
