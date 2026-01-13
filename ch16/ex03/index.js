import crypto from "crypto";
import fs from "fs";

const algorithm = "aes-256-cbc";
const keyFilePath = new URL("./key.json", import.meta.url);
const dataFilePath = new URL("./encrypted.json", import.meta.url);

// 鍵を生成する
function generateKey() {
  // 32バイトの暗号論的疑似乱数を生成する
  return crypto.randomBytes(32).toString("base64");
}

// 平文を鍵とAES-256-CBCで暗号化する。次に、暗号文と初期化ベクトル(IV)を、Base64エンコードして返す。
function encrypt64(text, key) {
  // 16バイトの暗号論的疑似乱数を初期化ベクトル (IV) とする
  const iv = crypto.randomBytes(16);

  // 暗号化とBase64エンコード
  const cipher = crypto.createCipheriv(
    algorithm,
    Buffer.from(key, "base64"),
    iv,
  );
  const encrypted = Buffer.concat([
    cipher.update(Buffer.from(text, "utf8")),
    cipher.final(),
  ]);
  const encryptedBase64 = encrypted.toString("base64");

  // 暗号文とIVをbase64で返す
  return {
    value: encryptedBase64,
    iv: iv.toString("base64"),
  };
}

// generateKeyの返り値を、JSON形式でファイルに保存する(非同期)
async function writeKey(key) {
  await fs.promises.writeFile(
    keyFilePath,
    JSON.stringify({ key }, null, 2),
    "utf8",
  );
}

// encrypt64の返り値を、JSON形式でファイルに保存する(非同期)
async function writeEncrypt64(data) {
  await fs.promises.writeFile(
    dataFilePath,
    JSON.stringify(data, null, 2),
    "utf8",
  );
}

async function readKey() {
  const raw = await fs.promises.readFile(keyFilePath, "utf8");
  const { key } = JSON.parse(raw);
  return key;
}

// ファイルから暗号データを読み込む (非同期)
async function readEncrypt64() {
  const raw = await fs.promises.readFile(dataFilePath, "utf8");
  return JSON.parse(raw);
}

// 復号して平文を返す
function decrypt64(data, key) {
  const iv = Buffer.from(data.iv, "base64");
  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(key, "base64"),
    iv,
  );
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(data.value, "base64")),
    decipher.final(),
  ]);
  return decrypted.toString("utf8");
}

// 指定の平文を暗号化とBase64エンコードし、後に復号する一連の処理
(async () => {
  // 平文
  const text = "Hello, World!";

  // 暗号化とBase64エンコード
  const key = generateKey();
  const encryptedData = encrypt64(text, key);

  // 鍵と暗号データをJSONで保存
  await writeKey(key);
  await writeEncrypt64(encryptedData);

  console.log("Encrypted Text (Base64):", encryptedData.value);

  // Base64デコードと復号
  const storedKey = await readKey();
  const storedEncryptedData = await readEncrypt64();
  const decryptedText = decrypt64(storedEncryptedData, storedKey);

  console.log("Decrypted Text:", decryptedText);
})();
