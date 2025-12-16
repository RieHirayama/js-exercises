const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

let db; // IndexedDB のデータベースインスタンス
let todosCache = []; // メモリ上に todos をキャッシュ（IndexedDB が使えない場合用）

// BroadcastChannel を作成（複数タブ間の通信用）
// BroadcastChannel は、同一オリジン内の複数のタブ/ウィンドウ/ワーカー間で通信するための Web API。
// IndexedDB などのストレージとは異なり、リアルタイムでメッセージを送受信 できる。
const channel = new BroadcastChannel('todos-channel');

// データベース初期化関数
async function initDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('todoDB', 1); // DB名, バージョン
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };
    
    // 初回作成時またはバージョン更新時
    request.onupgradeneeded = (event) => {
      const database = event.target.result;
      if (!database.objectStoreNames.contains('todos')) {
        database.createObjectStore('todos', { keyPath: 'id' });
      }
    };
  });
}

// IndexedDB に保存する
async function saveTodos(todos) {
  try {
    const transaction = db.transaction('todos', 'readwrite');
    const store = transaction.objectStore('todos');
    
    // 既存データをすべて削除
    store.clear();
    
    // 新しいデータを追加（put で ID を尊重）
    for (const todo of todos) {
      store.put(todo);
    }
    
    // トランザクション完了を待つ
    await new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  } catch (e) {
    // IndexedDB が使えない場合は、メモリキャッシュだけを更新
    console.log("IndexedDB が使えない場合は、メモリキャッシュを使用", e);
  }
  
  // メモリキャッシュを常に更新
  todosCache = todos;
}

// IndexedDB から読み込む
async function loadTodos() {
  try {
    const transaction = db.transaction('todos', 'readonly');
    const store = transaction.objectStore('todos');
    
    const todos = await new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
    
    // メモリキャッシュを更新
    todosCache = todos;
    
    return todos;
  } catch (e) {
    // IndexedDB が使えない場合は、メモリキャッシュを使用
    console.log("IndexedDB が使えない場合は、メモリキャッシュを使用");
    
    return todosCache;
  }
}

// ページが開かれた時に、IndexedDB からToDoリストを読み込んで表示する
document.addEventListener("DOMContentLoaded", async () => {
  await initDB(); // DB初期化を先に実行
  const todos = await loadTodos();
  todos.forEach(todo => {
    appendToDoItem(todo);
  });
});

form.addEventListener("submit", async (e) => {
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
  
  // UI を無効化（重複送信を防ぐ）
  input.disabled = true;
  form.querySelector("button").disabled = true;
  
  const todo = input.value.trim();
  // new-todo の中身は空にする
  input.value = "";

  // IndexedDB に保存する新しい ToDo オブジェクトを作成
  const todoData = {
    name: todo,
    status: "active"
  };
  
  try {
    // 既存の todos を取得して最大 ID を計算
    const existingTodos = await loadTodos();
    const maxId = existingTodos.length > 0 ? Math.max(...existingTodos.map(t => t.id)) : 0;
    const newId = maxId + 1;
    
    // 新しい Todo オブジェクトに ID を付与
    const newTodo = {
      id: newId,
      name: todo,
      status: "active"
    };
    
    // IndexedDB に直接保存
    const transaction = db.transaction('todos', 'readwrite');
    const store = transaction.objectStore('todos');
    
    await new Promise((resolve, reject) => {
      const request = store.put(newTodo);
      request.onsuccess = () => resolve();
      request.onerror = () => {
        console.error("put error:", request.error);
        reject(request.error);
      };
    });
    
    // トランザクション完了を待つ
    await new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => {
        console.error("transaction error:", transaction.error);
        reject(transaction.error);
      };
    });
    
    // メモリキャッシュも更新
    const todos = await loadTodos();
    
    // BroadcastChannel で別タブに通知
    channel.postMessage({ type: 'update', todos });
    
    // 同一タブの画面は直接更新
    appendToDoItem(newTodo);
  } catch (e) {
    console.error("Form submit error:", e);
    alert(`エラーが発生しました: ${e.message}`);
  } finally {
    // UI を有効化
    input.disabled = false;
    form.querySelector("button").disabled = false;
    
    // 入力欄にフォーカス
    input.focus();
  }
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
  
  toggle.addEventListener("change", async () => {
    label.style.textDecorationLine = toggle.checked ? "line-through" : "none";
    
    const todos = await loadTodos();

    // 既存の同じ ID のオブジェクトがある場合、status だけを更新
    const todoItem = todos.find(t => t.id === todo.id);
    if (todoItem) {
      todoItem.status = toggle.checked ? "completed" : "active";
      await saveTodos(todos); // IndexedDB に保存
      
      // BroadcastChannel で別タブに通知
      channel.postMessage({ type: 'update', todos });
      
      // dispatchEvent で同一タブにも通知
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'todos',
        newValue: JSON.stringify(todos),
      }));
    }
  });

  const destroy = document.createElement("button");
  destroy.textContent = "❌";
  destroy.addEventListener("click", async () => {
    const todos = await loadTodos();
    const filtered = todos.filter(t => t.id !== todo.id);
    await saveTodos(filtered);
    
    // BroadcastChannel で別タブに通知
    channel.postMessage({ type: 'update', todos: filtered });
    
    // dispatchEvent で同一タブにも通知
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'todos',
      newValue: JSON.stringify(filtered),
    }));
    
    // 同一タブの画面は直接更新
    elem.remove();
  });

  elem.append(toggle, label, destroy);
  list.prepend(elem);
}

// BroadcastChannel で別タブからのメッセージを受信
channel.addEventListener('message', (event) => {
  if (event.data.type === 'update') {
    // リスト全体を再構築
    list.innerHTML = '';
    const todos = event.data.todos;
    todos.forEach(todo => {
      appendToDoItem(todo);
    });
  }
});

// 同一タブ内の storage イベントを受信
window.addEventListener('storage', (event) => {
  if (event.key === 'todos' && event.newValue) {
    const todos = JSON.parse(event.newValue);
    list.innerHTML = '';
    todos.forEach(todo => {
      appendToDoItem(todo);
    });
  }
});
