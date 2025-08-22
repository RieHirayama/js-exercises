export function stringifyJSON(value) {
  return serialize(value);
}

function serialize(val) {
  // null
  if (val === null) return "null";

  const t = typeof val;

  // primitive
  if (t === "number") {
    return Number.isFinite(val) ? String(val) : "null";
  }
  if (t === "boolean") return val ? "true" : "false";
  if (t === "string") return quoteString(val);

  if (t === "bigint") {
    throw new TypeError("Do not know how to serialize a BigInt");
  }
  if (t === "undefined" || t === "function" || t === "symbol") {
    return undefined;
  }

  // Array
  if (Array.isArray(val)) {
    const out = [];
    for (let i = 0; i < val.length; i++) {
      const v = serialize(val[i]);
      out.push(v === undefined ? "null" : v);
    }
    return "[" + out.join(",") + "]";
  }

  if (val && typeof val.toJSON === "function") {
    return serialize(val.toJSON());
  }

  // Object
  if (t === "object") {
    const props = [];
    for (const key of Object.keys(val)) {
      const v = serialize(val[key]);
      if (v !== undefined) {
        props.push(quoteString(key) + ":" + v);
      }
    }
    return "{" + props.join(",") + "}";
  }

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
          out += "\\u" + ch.toString(16).padStart(4, "0"); 
        } else {
          out += String.fromCharCode(ch); 
        }
    }
  }
  out += '"';
  return out;
}


