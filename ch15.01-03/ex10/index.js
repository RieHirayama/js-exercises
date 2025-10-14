const div = document.getElementById("editor-front");
const input = document.getElementById("editor-back");

// 初期状態で背景色を白に設定
div.style.backgroundColor = "rgb(255, 255, 255)";

// divをクリックすると input がフォーカスされる
div.addEventListener("click", () => {
  input.focus();
});

// input にフォーカスされたら div を灰色に、外れたら白に戻す
input.addEventListener("focus", () => {
  div.style.backgroundColor = "rgb(192, 192, 192)";
});

input.addEventListener("blur", () => {
  div.style.backgroundColor = "rgb(255, 255, 255)";
});

// input に入力されたテキストを div に表示（サニタイズは textContent）
input.addEventListener("input", () => {
  div.textContent = input.value;
});