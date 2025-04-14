// 文字列中の改行コードをLF→CR+LFに変換する関数
export function convertLFtoCRLF(str) {
    return str.replace(/\r?\n/g, "\r\n");
}
// 文字列中のCR+LFをLFに変換する関数
export function convertCRLFtoLF(str) {
    return str.replace(/\r\n/g, "\n");
}