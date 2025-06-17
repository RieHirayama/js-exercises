import {hashString, newHashTable, findCollisions} from './index.js';

describe('ハッシュテーブルオブジェクトテスト', () => {
    const hashTable = newHashTable(10);
    const collisionKey = findCollisions("key3", 10); // key3と衝突するキーを探す
    console.log(`collisionKey=${collisionKey}`);

    test('初期状態の確認', () => {
        expect(hashTable.size).toBe(0);
        expect(hashTable.entries.length).toBe(10);
    });
    test('マッピングの追加', () => {
        hashTable.put('key1', 'value1');
        expect(hashTable.get('key1')).toBe('value1');
        expect(hashTable.size).toBe(1);
    });
    test('マッピングの追加', () => {
        hashTable.put('key2', 'value2');
        expect(hashTable.get('key2')).toBe('value2');
        expect(hashTable.size).toBe(2);
    });
    test('マッピングの取得', () => {
        expect(hashTable.get('key1')).toBe('value1');
        expect(hashTable.get('key2')).toBe('value2');
        expect(hashTable.get('key3')).toBeUndefined();
    });
    test('マッピングの追加', () => {
        hashTable.put('key3', 'value3');
        expect(hashTable.get('key3')).toBe('value3');
        expect(hashTable.size).toBe(3);
    });
    test('エントリの衝突処理', () => {
        console.log(JSON.stringify(hashTable.entries, null, 2));
        //hashTable.put('text14', 'collisionKeyValue');
        hashTable.put(collisionKey[0], 'collisionKeyValue');
        console.log(JSON.stringify(hashTable.entries, null, 2));
        expect(hashTable.get('key3')).toBe('value3');
        //expect(hashTable.get('text14')).toBe('collisionKeyValue');
        expect(hashTable.get(collisionKey[0])).toBe('collisionKeyValue');
        expect(hashTable.size).toBe(4); // 衝突してもリストでエントリ追加したのでサイズは＋１
    });
    test('entriesの内容確認', () => {
        // key3とcollisionKey[0]が同じバケットに入っていることを確認
        const index = hashString('key3') % 10;
        expect(hashTable.entries[index]).toEqual({
        key: "key3",
        value: "value3",
        next: { key: collisionKey[0], value: "collisionKeyValue", next: undefined }
        });
    });
    test('マッピングの更新', () => {
        hashTable.put('key2', 'new value');
        expect(hashTable.get('key2')).toBe('new value');
        expect(hashTable.size).toBe(4);
    });
    test('マッピングの削除', () => {
        hashTable.remove('key2');
        expect(hashTable.get('key2')).toBeUndefined();
        expect(hashTable.size).toBe(3);
    });
    test('存在しないキーの削除', () => {
        hashTable.remove('key4'); // 存在しないキーを削除
        expect(hashTable.size).toBe(3); // サイズは変わらないはず
    });
    
});