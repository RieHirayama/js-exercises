import { useState } from 'react';

export default function App() {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();

    const t = text.trim();
    if (t === '') return;

    const newTodo = {
      id: crypto.randomUUID(),
      title: t,
      completed: false,
    };

    // 先頭に追加
    setTodos((prev) => [newTodo, ...prev]);
    setText('');
  }

  function toggleTodo(id) {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }

  function deleteTodo(id) {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }

  return (
    <>
      <form id="new-todo-form" onSubmit={handleSubmit}>
        <input
          type="text"
          id="new-todo"
          placeholder="What needs to be done?"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <ul id="todo-list">
        {todos.map((todo) => (
          <li key={todo.id}>
            <div>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              <label
                style={{
                  textDecorationLine: todo.completed ? 'line-through' : 'none',
                }}
              >
                {todo.title}
              </label>
              <button type="button" onClick={() => deleteTodo(todo.id)}>
                ❌
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
