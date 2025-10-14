export function unwritableAndUnconfigurableObj() {
  const obj = { a: 1 };
  Object.defineProperty(obj, "a", {
    writable: false,
    configurable: false,
  });
  return obj;
}

export function writableAndUnconfigurableObj(){
  const obj = { b: 2 };
  Object.defineProperty(obj, "b", {
  configurable: false,
  });
  return obj;
};

export function nestedUnwritableObj() {
  const obj = { c: { d: { e: 3 } } };

  // 全階層を凍結（拡張不可、再定義不可、書き込み不可）
  Object.freeze(obj);
  Object.freeze(obj.c);
  Object.freeze(obj.c.d);

  return obj;
}