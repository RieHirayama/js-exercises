// 文字列のパラメータを取り、制御文字など文字列リテラル作成時エスケープシーケンスで記述する必要がある文字 (\0,\b,\t,\n,\v,\f,\r,\",\',\\)を、
// エスケープシーケンスに変換した文字列を返すメソッドを書きなさい。
// 例えば文字列中に`\`が含まれていたら、`\\`に変換しなさい。if-else で分岐するバージョンと switch で分岐するバージョンの両方を作りなさい。

// if-else で分岐するバージョン
export function escapeString1(str) {
  let escapedStr = '';
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (char === '\0') {
      escapedStr += '\\0';
    } else if (char === '\b') {
      escapedStr += '\\b';
    } else if (char === '\t') {
      escapedStr += '\\t';
    } else if (char === '\n') {
      escapedStr += '\\n';
    } else if (char === '\v') {
      escapedStr += '\\v';
    } else if (char === '\f') {
      escapedStr += '\\f';
    } else if (char === '\r') {
      escapedStr += '\\r';
    } else if (char === '"') {
      escapedStr += '\\"';
    } else if (char === "'") {
      escapedStr += "\\'";
    } else if (char === '\\') {
      escapedStr += '\\\\';
    } else {
      escapedStr += char;
    }
  }
  return escapedStr;
}

// switch で分岐するバージョン
export function escapeString2(str) {
  let escapedStr = '';
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    switch (char) {
      case '\0':
        escapedStr += '\\0';
        break;
      case '\b':
        escapedStr += '\\b';
        break;
      case '\t':
        escapedStr += '\\t';
        break;
      case '\n':
        escapedStr += '\\n';
        break;
      case '\v':
        escapedStr += '\\v';
        break;
      case '\f':
        escapedStr += '\\f';
        break;
      case '\r':
        escapedStr += '\\r';
        break;
      case '"':
        escapedStr += '\\"';
        break;
      case "'":
        escapedStr += "\\'";
        break;
      case '\\':
        escapedStr += '\\\\';
        break;
      default:
        escapedStr += char;
    }
  }
  return escapedStr;
}

// テスト
console.log(escapeString1('Hello\nWorld')); // Hello\nWorld 
console.log(escapeString2('Hello\nWorld')); // Hello\nWorld
console.log(escapeString1('Hello\tWorld')); // Hello\tWorld
console.log(escapeString2('Hello\tWorld')); // Hello\tWorld
console.log(escapeString1('Hello\bWorld')); // Hello\bWorld
console.log(escapeString2('Hello\bWorld')); // Hello\bWorld
console.log(escapeString1('Hello\fWorld')); // Hello\fWorld
console.log(escapeString2('Hello\fWorld')); // Hello\fWorld
console.log(escapeString1('Hello\rWorld')); // Hello\rWorld
console.log(escapeString2('Hello\rWorld')); // Hello\rWorld
console.log(escapeString1('Hello\vWorld')); // Hello\vWorld
console.log(escapeString2('Hello\vWorld')); // Hello\vWorld
console.log(escapeString1('Hello\'World')); // Hello\'World
console.log(escapeString2('Hello\'World')); // Hello\'World
console.log(escapeString1('Hello"World')); // Hello\"World
console.log(escapeString2('Hello"World')); // Hello\"World
console.log(escapeString1('Hello\\World')); // Hello\\World
console.log(escapeString2('Hello\\World')); // Hello\\World
console.log(escapeString1('Hello\0World')); // Hello\0World
console.log(escapeString2('Hello\0World')); // Hello\0World