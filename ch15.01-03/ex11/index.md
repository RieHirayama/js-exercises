【初期状態 capture: true】
ボタン押下時のコンソール出力結果:
index.html:13 div
index.html:18 button

- `div.addEventListener('click', ..., { capture: true })` のとき
  - 順序：div → button（キャプチャリング → ターゲット）

【値変更 capture: false】
ボタン押下時のコンソール出力結果:
index.html:18 button
index.html:13 div

- `div.addEventListener('click', ..., /* capture: false */)` のとき
  - 順序：button → div（ターゲット → バブリング）
