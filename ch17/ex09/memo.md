# TypeScript版

## 実行手順

- ch17直下で： npx tsc

- ex09/dist/にtask.jsとcaller.jsが生成される。

- ch17直下で以下実行
node ex09/dist/caller.js


## 実行結果
> node ex09/dist/caller.js
[
  {
    title: 'テキストを読む',
    completed: true,
    user: { id: 1, name: 'Alice' },
    priority: 'high'
  },
  {
    title: '質問表を書く',
    completed: true,
    user: { id: 1, name: 'Alice' },
    priority: 'middle'
  },
  {
    title: '質問表を確認する',
    completed: true,
    user: { id: 2, name: 'Bob' },
    priority: 'low'
  },
  {
    title: '問題を作成する',
    completed: false,
    user: { id: 2, name: 'Bob' },
    priority: 'middle'
  }
]
[
  {
    title: '問題を作成する',
    completed: false,
    user: { id: 2, name: 'Bob' },
    priority: 'middle'
  }
]


# Flow版

## 実行手順

- Flow初期化: npx flow init
これにより、.flowconfig が作られる

- 型チェック: npx flow check
エラーが出なければOK

- 型削除インストール: npm i -D flow-remove-types

- JSへ変換: npx flow-remove-types ex09/task.flow.js -o ex09/task.flow.js

- 実行: node ex09/caller.js


## 実行結果
> npx flow check
Found 0 errors


> npm i -D flow-remove-types

up to date, audited 616 packages in 2s

144 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities


> npx flow-remove-types ex09/task.flow.js -o ex09/task.flow.js
ex09/task.flow.js
 ↳ ex09/task.flow.js


 > node ex09/caller.js
[
  {
    title: 'テキストを読む',
    completed: true,
    user: { id: 1, name: 'Alice' },
    priority: 'high'
  },
  {
    title: '質問表を書く',
    completed: true,
    user: { id: 1, name: 'Alice' },
    priority: 'middle'
  },
  {
    title: '質問表を確認する',
    completed: true,
    user: { id: 2, name: 'Bob' },
    priority: 'low'
  },
  {
    title: '問題を作成する',
    completed: false,
    user: { id: 2, name: 'Bob' },
    priority: 'middle'
  }
]
[
  {
    title: '問題を作成する',
    completed: false,
    user: { id: 2, name: 'Bob' },
    priority: 'middle'
  }
]