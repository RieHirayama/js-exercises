// オブジェクトのすべての独自プロパティ（列挙不可、プロパティ名が Symbol のものを含む）および列挙可能な継承プロパティのプロパティ名の配列を返す関数

export function getAllPropertyKeys(obj) {
  const ownKeys = [
    ...Object.getOwnPropertyNames(obj),
    ...Object.getOwnPropertySymbols(obj)
  ];

  const inheritedEnumerableKeys = [];
  let proto = Object.getPrototypeOf(obj);

  while (proto && proto !== Object.prototype) {
    for (let key of Object.keys(proto)) { // Object.keys()はSymbolを無視
      if (!obj.hasOwnProperty(key) && !inheritedEnumerableKeys.includes(key)) {
        inheritedEnumerableKeys.push(key);
      }
    }
    proto = Object.getPrototypeOf(proto);
  }

  return [...ownKeys, ...inheritedEnumerableKeys];
}