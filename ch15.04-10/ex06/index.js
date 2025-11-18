const template = document.createElement("template");
template.innerHTML = `\
<style>
.completed {
  text-decoration: line-through;
}
</style>

<form id="new-todo-form">
  <input type="text" id="new-todo" placeholder="What needs to be done?" />
  <button>Add</button>
</form>
<ul id="todo-list"></ul>
`;

class TodoApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.form = this.shadowRoot.querySelector("#new-todo-form");
    // TODO: 残りを実装
    this.input = this.shadowRoot.querySelector("#new-todo");
    this.list = this.shadowRoot.querySelector("#todo-list");

    // フォーム送信時の処理
    this.handleSubmit = (event) => {
      event.preventDefault();
      const value = this.input.value.trim();
      if (!value) {
        return;
      }
      this.input.value = "";
      this.addTodo(value);
    };
  }

  // 要素が DOM に追加されたときに呼ばれる
  connectedCallback() {
    this.form.addEventListener("submit", this.handleSubmit);
  }

  // 1件の ToDo を作成してリストに追加する
  addTodo(text) {
    const li = document.createElement("li");

    const view = document.createElement("div");
    view.classList.add("view");

    const toggle = document.createElement("input");
    toggle.type = "checkbox";
    toggle.classList.add("toggle");

    const label = document.createElement("label");
    label.classList.add("content");
    label.textContent = text;

    const destroy = document.createElement("button");
    destroy.type = "button";
    destroy.classList.add("destroy");
    destroy.textContent = "❌";

    // チェックボックスの ON/OFF で completed クラスを付け外し
    toggle.addEventListener("change", () => {
      li.classList.toggle("completed", toggle.checked);
    });

    // 削除ボタンで li を削除
    destroy.addEventListener("click", () => {
      li.remove();
    });

    view.append(toggle, label, destroy);
    li.append(view);

    // 新しいToDoを先頭に追加
    this.list.prepend(li);
  }
}

customElements.define("todo-app", TodoApp);
