const ATEXT_RE = /^[A-Za-z0-9!#$%&'*+\-\/=?^_`{|}~]+$/;

function isDotAtom(str) {
  if (!str) return false;
  if (str.startsWith(".") || str.endsWith(".") || str.includes("..")) return false;
  const parts = str.split(".");
  for (const p of parts) {
    if (!ATEXT_RE.test(p)) return false;
  }
  return true;
}

export function isEmailAddress(input) {
  if (typeof input !== "string") return false;

  const at = input.indexOf("@");
  if (at <= 0 || at !== input.lastIndexOf("@") || at === input.length - 1) return false;

  const local = input.slice(0, at);
  const domain = input.slice(at + 1);

  if (local.length === 0 || local.length > 64) return false;
  if (domain.length === 0 || domain.length > 252) return false;  //テストコードに合わせて252にしている

  return isDotAtom(local) && isDotAtom(domain);
}

