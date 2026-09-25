import { useMemo, useState } from 'react'
import './App.css'

interface Todo {
  id: number
  text: string
  done: boolean
}

let nextId = 1

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [draft, setDraft] = useState('')

  const remaining = useMemo(
    () => todos.filter((todo) => !todo.done).length,
    [todos],
  )

  function addTodo() {
    const text = draft.trim()
    if (!text) return
    setTodos((prev) => [...prev, { id: nextId++, text, done: false }])
    setDraft('')
  }

  function toggleTodo(id: number) {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    )
  }

  function removeTodo(id: number) {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  return (
    <main className="app">
      <h1>andrewkcl</h1>
      <p className="subtitle">A tiny Vite + React + TypeScript todo app</p>

      <form
        className="add-form"
        onSubmit={(event) => {
          event.preventDefault()
          addTodo()
        }}
      >
        <input
          aria-label="New todo"
          placeholder="What needs doing?"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <p className="status" data-testid="remaining">
        {remaining} item{remaining === 1 ? '' : 's'} remaining
      </p>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className={todo.done ? 'done' : undefined}>
            <label>
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => toggleTodo(todo.id)}
              />
              <span>{todo.text}</span>
            </label>
            <button
              type="button"
              className="remove"
              aria-label={`Remove ${todo.text}`}
              onClick={() => removeTodo(todo.id)}
            >
              ×
            </button>
          </li>
        ))}
      </ul>

      {todos.length === 0 && (
        <p className="empty">Nothing here yet — add your first todo above.</p>
      )}
    </main>
  )
}

export default App
