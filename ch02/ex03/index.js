/**
 * Unicode
 *  ハ：U+30CF：\u30CF
 *  パ：U+30D1：\u30D1
 *  ン：U+30F3：\u30F3
 *  半濁点：゜：U+309A：\u309A
 *
 * パン
 *  NFC 　U+30D1　U+30F3
 *  NFD　U+30CF　U+309A　U+30F3
*/

console.log("NFC: \u30D1\u30F3");
console.log("NFD: \u30CF\u309A\u30F3");
console.log("パン");