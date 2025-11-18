const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");
const template = document.querySelector("#todo-template");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value.trim() === "") {
    return;
  }
  const todo = input.value.trim();
  input.value = "";

  const clone = template.content.cloneNode(true);
  const li = clone.querySelector("li");
  const toggle = clone.querySelector("input");
  const label = clone.querySelector("label");
  const destroy = clone.querySelector("button");

  toggle.addEventListener("change", () => {
    // IMPORTANT: ChatGPT にはこの関数内のコードのみ変更してもらうこと
    //li.classList.toggle("completed", toggle.checked);
    label.classList.toggle("line-through", toggle.checked);
    label.classList.toggle("text-slate-400", toggle.checked);
    label.classList.toggle("italic", toggle.checked);
    label.classList.toggle("opacity-75", toggle.checked);
  });
  label.textContent = todo;
  destroy.addEventListener("click", () => {
    li.remove();
  });

  list.prepend(li);
});
