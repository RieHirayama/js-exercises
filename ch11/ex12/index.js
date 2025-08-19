// 独自エラー: 許容サイズ超過
export class FileTooLargeError extends Error {
  constructor(path, size, limit) {
    const fmt = (n) => {
      const u = ["B", "KB", "MB", "GB", "TB"];
      let i = 0, x = n;
      while (x >= 1024 && i < u.length - 1) { x /= 1024; i++; }
      const s = x < 10 && i > 0 ? x.toFixed(1) : Math.round(x).toString();
      return `${s} ${u[i]}`;
    };
    super(`File "${path}" is too large: ${fmt(size)} > ${fmt(limit)}`);
    this.name = "FileTooLargeError";
    this.code = "ERR_FILE_TOO_LARGE";
    this.path = path;
    this.size = size;
    this.limit = limit;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FileTooLargeError);
    }
  }
}

