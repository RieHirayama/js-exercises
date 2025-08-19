export class TypeMap {
  #map = new Map();

  get(key) {
    return this.#map.get(key);
  }

  set(key, value) {
    // key はコンストラクタ関数に限定
    if (typeof key !== "function") {
      throw new TypeError("keyはコンストラクタ関数でなければなりません");
    }

    // 値とキー（コンストラクタ）の整合性チェック
    const ok =
      (key === String  && (typeof value === "string"  || value instanceof String)) ||
      (key === Number  && (typeof value === "number"  || value instanceof Number)) ||
      (key === Boolean && (typeof value === "boolean" || value instanceof Boolean)) ||
      (key === Symbol  && typeof value === "symbol") ||
      (key === BigInt  && typeof value === "bigint") ||
      (key !== String &&
       key !== Number &&
       key !== Boolean &&
       key !== Symbol &&
       key !== BigInt &&
       value instanceof key);

    if (!ok) {
      const k = key.name;
      throw new TypeError(`値は ${k} のインスタンスでなければなりません`);
    }

    this.#map.set(key, value);
    return this;
  }
}