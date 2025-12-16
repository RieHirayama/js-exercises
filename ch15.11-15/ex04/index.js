const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

let nextId = 1; // ToDo アイテムの一意な ID を生成するためのカウンタ
let todosCache = []; // メモリ上に todos をキャッシュ（localStorage が使えない場合用）

// localStorage に保存する
function saveTodos(todos) {
  try {
    localStorage.setItem('todos', JSON.stringify(todos));
  } catch (e) {
    // localStorage が使えない場合は、メモリキャッシュだけを更新
    console.log("localStorage が使えない場合は、メモリキャッシュを使用");
  }
  
  // メモリキャッシュを常に更新
  todosCache = todos;
}

// localStorage から読み込む
function loadTodos() {
  try {
    const data = localStorage.getItem('todos');
    const todos = data ? JSON.parse(data) : [];
    
    // メモリキャッシュを更新
    todosCache = todos;
    
    // 既存の todos から最大 ID を見つけて、nextId を設定
    if (todos.length > 0) {
      const maxId = Math.max(...todos.map(t => t.id));
      nextId = maxId + 1;
    } else {
      nextId = 1;
    }
    
    return todos;
  } catch (e) {
    // localStorage が使えない場合は、メモリキャッシュを使用
    console.log("localStorage が使えない場合は、メモリキャッシュを使用");
    
    if (todosCache.length > 0) {
      const maxId = Math.max(...todosCache.map(t => t.id));
      nextId = maxId + 1;
    } else {
      nextId = 1;
    }
    
    return todosCache;
  }
}

// ページが開かれた時に、localStorage からToDoリストを読み込んで表示する
document.addEventListener("DOMContentLoaded", () => {
  const todos = loadTodos();
  todos.forEach(todo => {
    appendToDoItem(todo);
  });
});

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

  // localStorage に保存する新しい ToDo オブジェクトを作成
  const newTodo = {
    id: nextId,
    name: todo,
    status: "active"
  };
  
  // localStorage に保存
  const todos = loadTodos();
  todos.push(newTodo);  // 最後に追加（古い順を保持）
  saveTodos(todos);
  
  // storage イベントを手動で発火（画面を再構築）
  window.dispatchEvent(new StorageEvent('storage', {
    key: 'todos',
    newValue: JSON.stringify(todos)
  }));
});

// Todo リストの要素を追加する関数
function appendToDoItem(todo) {
  const elem = document.createElement("li");
  elem.dataset.id = todo.id; // 後で検索するため ID を保存

  const label = document.createElement("label");
  label.textContent = todo.name;
  label.style.textDecorationLine = "none";

  const toggle = document.createElement("input");
  toggle.type = "checkbox";
  toggle.checked = todo.status === "completed";
  label.style.textDecorationLine = toggle.checked ? "line-through" : "none";
  
  toggle.addEventListener("change", () => {
    label.style.textDecorationLine = toggle.checked ? "line-through" : "none";
    
    const todos = loadTodos();

    // 既存の同じ ID のオブジェクトがある場合、status だけを更新
    const todoItem = todos.find(t => t.id === todo.id);
    if (todoItem) {
      todoItem.status = toggle.checked ? "completed" : "active";
      saveTodos(todos); // localStorage に保存
      
      // ローカルの todo オブジェクトも同期
      todo.status = todoItem.status;
      
      // storage イベントを手動で発火（画面を再構築）
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'todos',
        newValue: JSON.stringify(todos)
      }));
    }
  });

  const destroy = document.createElement("button");
  destroy.textContent = "❌";
  destroy.addEventListener("click", () => {
    const todos = loadTodos();
    const filtered = todos.filter(t => t.id !== todo.id);
    saveTodos(filtered);
    
    // storage イベントを手動で発火（画面を再構築）
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'todos',
      newValue: JSON.stringify(filtered)
    }));
    
    elem.remove();
  });

  elem.append(toggle, label, destroy);
  list.prepend(elem);
}

// 複数タブ間での同期のために storage イベントを監視
  window.addEventListener('storage', (event) => {
  if (event.key === 'todos') {
    // 別のタブで todos が変更された
    list.innerHTML = ''; // 現在のリストをクリア
    const todos = loadTodos();
    todos.forEach(todo => {
      appendToDoItem(todo);
    });
  }
});
