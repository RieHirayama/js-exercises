const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

document.addEventListener("DOMContentLoaded", async () => {
  // Cookie を確認
  console.log("Cookie:", document.cookie);
  // TODO: ここで API を呼び出してタスク一覧を取得し、
  // 成功したら取得したタスクを appendToDoItem で ToDo リストの要素として追加しなさい
  try {
    const response = await fetch("/api/tasks");
    const { items } = await response.json();
    items.forEach(appendToDoItem); // 取得したタスクそれぞれでappendToDoItemを呼び出す
  } catch (err) {
    alert(err.message);
  }
});

form.addEventListener("submit", async (e) => {
  // TODO: ここで form のイベントのキャンセルを実施しなさい (なぜでしょう？)
  // 回答: JavaScriptで非同期にAPI通信を行い、ページをリロードせずにDOMを更新するため
  e.preventDefault(); // フォームのデフォルト動作（ページリロード）を防ぐ

  // 両端からホワイトスペースを取り除いた文字列を取得する
  const todo = input.value.trim();
  if (todo === "") {
    return;
  }

  // new-todo の中身は空にする
  input.value = "";

  // TODO: ここで API を呼び出して新しいタスクを作成し
  // 成功したら作成したタスクを appendToDoItem で ToDo リストの要素として追加しなさい
  try {
    const response = await fetch("/api/tasks", { 
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify({ name: todo })
    });
    const created = await response.json();
    appendToDoItem(created);
  } catch (err) {
    alert(err.message);
  }
});

// API から取得したタスクオブジェクトを受け取って、ToDo リストの要素を追加する
function appendToDoItem(task) {
  // ここから #todo-list に追加する要素を構築する
  const elem = document.createElement("li");

  const label = document.createElement("label");
  label.textContent = task.name;
  label.style.textDecorationLine = "none";

  const toggle = document.createElement("input");
  // TODO: toggle が変化 (change) した際に API を呼び出してタスクの状態を更新し
  // 成功したら label.style.textDecorationLine を変更しなさい
  toggle.type = "checkbox";
  toggle.checked = task.status === "completed";
  label.style.textDecorationLine = toggle.checked ? "line-through" : "none";

  toggle.addEventListener("change", async () => {
    const nextStatus = toggle.checked ? "completed" : "active";
    try {
      const response = await fetch(`/api/tasks/${task.id}`, { 
      method: "PATCH",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify({ status: nextStatus })
      });
      const updated = await response.json();
      label.style.textDecorationLine =
        updated.status === "completed" ? "line-through" : "none";
    } catch (err) {
      toggle.checked = !toggle.checked; // 失敗時は元に戻す
      alert(err.message);
    }
  });

  const destroy = document.createElement("button");
  // TODO: destroy がクリック (click) された場合に API を呼び出してタスク を削除し
  // 成功したら elem を削除しなさい
  destroy.textContent = "❌";
  destroy.addEventListener("click", async () => {
    try {
      await fetch(`/api/tasks/${task.id}`, { 
      method: "DELETE"
      });
      elem.remove();
    } catch (err) {
      alert(err.message);
    }
  });

  // TODO: elem 内に toggle, label, destroy を追加しなさい
  elem.append(toggle, label, destroy);
  list.prepend(elem);
}
