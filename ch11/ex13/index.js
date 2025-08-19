export function stringifyJSON(value) {
  return serialize(value);
}

function serialize(val) {
  // null
  if (val === null) return "null";

  const t = typeof val;

  // primitive
  if (t === "number") {
    return Number.isFinite(val) ? String(val) : "null"; // NaN/±Infinity は null
  }
  if (t === "boolean") return val ? "true" : "false";
  if (t === "string") return quoteString(val);

  // サポート外（JSON.stringify と同様に BigInt は TypeError）
  if (t === "bigint") {
    throw new TypeError("Do not know how to serialize a BigInt");
  }
  if (t === "undefined" || t === "function" || t === "symbol") {
    // トップレベルで undefined/function/symbol は undefined → JSON.stringify は undefined を返すが、
    // この課題では配列/オブジェクトの中での扱いのみ登場。トップレベルは想定外として null でもよいが、
    // 仕様準拠にするなら undefined を返す（呼び出し側で分岐）。
    return undefined;
  }

  // Array
  if (Array.isArray(val)) {
    const out = [];
    for (let i = 0; i < val.length; i++) {
      const v = serialize(val[i]);
      // 配列要素の undefined/function/symbol は null に置換
      out.push(v === undefined ? "null" : v);
    }
    return "[" + out.join(",") + "]";
  }

  // toJSON があれば呼ぶ（JSON.stringify と同じ優先）
  if (val && typeof val.toJSON === "function") {
    return serialize(val.toJSON());
  }

  // Object（自分の列挙可能な文字キーのみ）
  if (t === "object") {
    const props = [];
    for (const key of Object.keys(val)) {
      const v = serialize(val[key]);
      // プロパティ値が undefined/function/symbol → 省略
      if (v !== undefined) {
        props.push(quoteString(key) + ":" + v);
      }
    }
    return "{" + props.join(",") + "}";
  }

  // ここには来ない想定
  return undefined;
}

// 文字列のエスケープ（JSON.stringify と同等：", \, 制御文字 0x00-0x1F をエスケープ）
function quoteString(str) {
  let out = '"';
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    switch (ch) {
      case 0x22: out += '\\"'; break; // "
      case 0x5c: out += "\\\\"; break; // \
      case 0x08: out += "\\b"; break;
      case 0x0c: out += "\\f"; break;
      case 0x0a: out += "\\n"; break;
      case 0x0d: out += "\\r"; break;
      case 0x09: out += "\\t"; break;
      default:
        if (ch < 0x20) {
          out += "\\u" + ch.toString(16).padStart(4, "0"); // 他の制御文字は \u00xx
        } else {
          out += String.fromCharCode(ch); // 通常はそのまま
        }
    }
  }
  out += '"';
  return out;
}


