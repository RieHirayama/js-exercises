import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import { FlatCompat } from "@eslint/eslintrc";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// eslintrc形式の "google" や "prettier" をFlat Configに変換
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default defineConfig([
  {
    ignores: ["ex01/format_sample.js", "ex01/org/**"],
  },

  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: globals.node,
      sourceType: "module",
    },
  },
  {
    files: ["**/*.test.{js,mjs,cjs}"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
  },

  // Google Style（eslintrcの "extends": "google" を互換読み込み）
  //...compat.extends("google"),
  // ESLint 9 では valid-jsdoc と require-jsdoc ルールが削除されたが、
  // eslint-config-google 側（Googleスタイルの共有設定）が 
  // その削除済みルールを参照していて、
  // ESLintが設定読込の時点で落ちる。
  // そのため、Google Style からはこれらを除外して読み込む
  // Google Style Guid（80桁・2スペ等）にはPrettierで寄せる。

  // Prettierと競合しうるスタイル系をESLint側で無効化
  ...compat.extends("prettier"),
]);
