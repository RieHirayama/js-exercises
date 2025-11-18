# 問題
Tailwind CSS がどういったフレームワークか調べなさい。

# 回答

## Tailwind CSSとは
小さなデザイン用クラスがたくさん用意されていて、それを組み合わせるだけでデザインできるCSSのフレームワーク。
- 普通（従来の）CSS：　CSSファイルに書いて、HTMLにクラス名を使う
- Tailwind CSS：　HTMLに直接Tailwindの"部品(utility class)"を並べる（CSSをほぼ書かない）

Tailwind CSS の記載例
```
<button class="bg-green-500 text-white px-4 py-2 rounded-md">
  送信
</button>
```

以下のような理由で選ばれている。
- CSSを書かなくても、デザインがすぐ出来る
- デザインが統一されやすい

### Tailwind提供している具体的なクラス例

- 色：text-gray-700 bg-blue-500

- 余白：p-4 mt-6

- Flex（レイアウト）：flex items-center justify-between

- Grid（列ごとのレイアウト）：grid grid-cols-3 gap-4

- 影：shadow-md

- 枠線：border border-gray-300

- 丸み：rounded-lg

- レスポンシブ：md:flex lg:px-10

※レスポンシブ対応で使うTailwindのデフォルトbreakpoint一覧
| prefix | 意味      | 最小幅     |
| ------ | ------- | ------- |
| `sm:`  | 小型タブレット | 640px〜  |
| `md:`  | タブレット   | 768px〜  |
| `lg:`  | ノートPC   | 1024px〜 |
| `xl:`  | 大画面     | 1280px〜 |
| `2xl:` | 超大型     | 1536px〜 |


以上