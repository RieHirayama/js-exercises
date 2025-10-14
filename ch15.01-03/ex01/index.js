const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

form.addEventListener("submit", (e) => {
  // TODO: ここで form のイベントのキャンセルを実施しなさい (なぜでしょう？)
  // フォームのイベント（submit）をキャンセルする理由は、ブラウザのデフォルト動作（ページのリロードや遷移）を防ぐため。
  // フォームのsubmitイベントは、通常「ページをサーバーに送信→リロード」される。
  // JavaScriptでTODOリストなどを画面上で動的に追加・更新したい場合、ページがリロードされると入力内容やリストが消えてしまう。
  // そのため、フォームのデフォルト送信（ページ遷移/リロード）を止める
  e.preventDefault();

  // 両端からホワイトスペースを取り除いた文字列を取得する
  if (input.value.trim() === "") {
    return;
  }
  const todo = input.value.trim();
  // new-todo の中身は空にする
  input.value = "";

  // ここから #todo-list に追加する要素を構築する
  const elem = document.createElement("li");
  // divで包む
  const wrapper = document.createElement("div");

  const label = document.createElement("label");
  label.textContent = todo;
  label.style.textDecorationLine = "none";

  const toggle = document.createElement("input");
  // TODO: toggle が変化 (change) した際に label.style.textDecorationLine を変更しなさい
  toggle.type = "checkbox";
  label.textContent = todo;
  label.style.textDecorationLine = "none";
  toggle.addEventListener("change", () => {
    label.style.textDecorationLine = toggle.checked ? "line-through" : "none";
  });

  const destroy = document.createElement("button");
  // TODO: destroy がクリック (click) された場合に elem を削除しなさい
  destroy.textContent = "❌";
  destroy.addEventListener("click", () => {
    elem.remove();
  });

  // TODO: elem 内に toggle, label, destroy を追加しなさい
  wrapper.append(toggle, label, destroy);
  elem.append(wrapper);
  list.prepend(elem);
});
