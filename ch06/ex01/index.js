// ハッシュテーブルオブジェクトの実装
/* 
ハッシュテーブルは下記のコードを参考に、以下の要件を満たすようにしなさい。
- マッピングの追加、取得、削除を行うメソッドおよびマッピング数を示すプロパティをもつこと。
- ハッシュテーブルは生成時に配列のサイズを受け取り、固定長の配列にマッピング情報を保持する
    - 配列のインデックスとして利用できるよう、ハッシュ値をサイズに合わせて変換すること（ハッシュ値に対して配列サイズの剰余を用いる）
    - 異なる key でハッシュ値を変換したインデックスが衝突した場合は、リンクリスト形式で複数のマッピングを保持すること。
- リハッシュ/リサイズについては考慮しなくてよいものとする。
*/

export function hashString(str) {
  // 文字列をハッシュ値に変換する関数(DJB2アルゴリズムを使用)
  let hash = 5381; // 衝突しにくい実用的初期値のマジックナンバー
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i) >>> 0; // hash * 33 + charCode
    // 「>>> 0」符号なし整数に変換して返す(ビット演算子は暗黙的に32ビット整数を返す)
  }
  return hash; 
}

export function newHashTable(capacity) {
  return {
    size: 0, // マッピング数を示すプロパティ
    entries: new Array(capacity), // マッピングを格納する固定長の配列

    get(key) {
      // keyにマップされた値を取得する
      const index = hashString(key) % capacity; // ハッシュ値を配列サイズで割った余りをインデックスとして使用
      let entry = this.entries[index];
      while (entry) {
        if (entry.key === key) {
          return entry.value; // マッチするkeyが見つかった場合、そのvalueを返す
        }
        entry = entry.next; // 次のエントリへ移動
      }
      return undefined; // keyが見つからない場合はundefinedを返す
    },

    put(key, value) {
      // key, valueのマッピングを追加する(keyが存在する場合はvalueを上書きする)
      const index = hashString(key) % capacity; // ハッシュ値を配列サイズで割った余りをインデックスとして使用
      let entry = this.entries[index];

      if (!entry) {
        // インデックスにエントリが存在しない場合、新規作成
        this.entries[index] = { key, value, next: undefined };
        this.size++;
        return;
      }
      // エントリが存在する場合、リンクリストを探索
      let current = entry;
      while (true) {
        if (current.key === key) {
          // 既存のkeyが見つかった場合、valueを更新
          current.value = value;
          return;
        }
        if (!current.next) {
          // 次のエントリがない場合、新規エントリを追加
          current.next = { key, value, next: undefined };
          this.size++;
          return;
        }
        current = current.next; // 次のエントリへ移動
      }

    },

    remove(key) {
      // keyのマッピングを削除する
      const index = hashString(key) % capacity; // ハッシュ値を配列サイズで割った余りをインデックスとして使用
      let entry = this.entries[index];
      let previous = null;
      while (entry) {
        if (entry.key === key) {
          // マッチするkeyが見つかった場合、削除処理を行う
          if (previous) {
            previous.next = entry.next; // 前のエントリのnextを現在のエントリのnextに設定
          } else {
            this.entries[index] = entry.next; // 最初のエントリを削除
          }
          this.size--; // マッピング数を減らす
          return;
        }
        previous = entry; // 現在のエントリを前のエントリとして保存
        entry = entry.next; // 次のエントリへ移動
      } 
    },
  };
}

export function sample() {
  const hashTable = newHashTable(10);
  hashTable.put("key1", "value1");
  hashTable.put("key2", { value: "value2" });

  console.log(`size=${hashTable.size}`); // => size=2
  console.log(`key1=${hashTable.get("key1")}`); // => key1=value1
  console.log(`key2=${JSON.stringify(hashTable.get("key2"))}`); // => key2={"value":"value2"}

  hashTable.put("key2", "new value");

  console.log(`key2=${hashTable.get("key2")}`); // => key2=new value

  hashTable.remove("key2");

  console.log(`key2=${hashTable.get("key2")}`); // => key2=undefined
  console.log(`size=${hashTable.size}`); // => size=1
}

sample();

export function findCollisions(targetKey, capacity){
    const targetHash = hashString(targetKey) % capacity;
    const collisions = [];
    for (let i = 0; i<10000; i++) {
        const testKey = "test" + i;
        if (hashString(testKey) % capacity === targetHash && testKey !== targetKey) {
            collisions.push(testKey);
            if (collisions.length >= 1) {
                break; // 1個の衝突キーを見つけたら終了
            }
        }
    }
    return collisions;
}