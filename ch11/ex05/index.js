export function detectFileType(buffer) {
  const bytes = new Uint8Array(buffer);

  const startsWith = (sig) => {
    if (bytes.length < sig.length) return false;
    for (let i = 0; i < sig.length; i++) {
      if (bytes[i] !== sig[i]) return false;
    }
    return true;
  };

  // PDF: 25 50 44 46 2D  -> "%PDF-"
  if (startsWith([0x25, 0x50, 0x44, 0x46, 0x2d])) return "PDF";

  // ZIP: 50 4B 03 04 | 50 4B 05 06 | 50 4B 07 08
  if (
    startsWith([0x50, 0x4b, 0x03, 0x04]) ||
    startsWith([0x50, 0x4b, 0x05, 0x06]) ||
    startsWith([0x50, 0x4b, 0x07, 0x08])
  ) return "ZIP";

  // GIF: "GIF87a" or "GIF89a"
  if (
    startsWith([0x47, 0x49, 0x46, 0x38, 0x37, 0x61]) || // GIF87a
    startsWith([0x47, 0x49, 0x46, 0x38, 0x39, 0x61])    // GIF89a
  ) return "GIF";

  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (startsWith([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) return "PNG";

  // どれでもない
  return "UNKNOWN";
}

