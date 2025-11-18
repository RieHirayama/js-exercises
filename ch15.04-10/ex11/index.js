const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");
const template = document.querySelector("#todo-template");

// { content: "...", completed: true or false } の配列
const todos = [];

// 現在のhashに応じて表示対象の配列を返す
function getFilteredTodos() {
  const hash = window.location.hash;
  if (hash === "#/active") {
    return todos.filter((t) => !t.completed);
  } else if (hash === "#/completed") {
    return todos.filter((t) => t.completed);
  } else {
    return todos;
  }
}

function renderTodos(todos) {
  list.innerHTML = "";
  todos.forEach((todo, index) => {
    const clone = template.content.cloneNode(true);
    const li = clone.querySelector("li");
    const toggle = clone.querySelector("input");
    const label = clone.querySelector("label");
    const destroy = clone.querySelector("button");

    li.classList.toggle("completed", todo.completed);
    toggle.addEventListener("change", () => {
      todo.completed = toggle.checked;
      renderTodos(getFilteredTodos());
    });
    label.textContent = todo.content;
    toggle.checked = todo.completed;
    destroy.addEventListener("click", () => {
      todos.splice(index, 1);
      deleteTodo(todo.content);
      renderTodos(getFilteredTodos());
    });

    list.appendChild(li);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value.trim() === "") {
    return;
  }
  const todo = input.value.trim();
  input.value = "";

  todos.push({ content: todo, completed: false });
  renderTodos(getFilteredTodos());
});

window.addEventListener("hashchange", () => {
  // ここを実装してね
  renderTodos(getFilteredTodos());
});

function deleteTodo(content) {
  todos = todos.filter((t) => t.content !== content);
}