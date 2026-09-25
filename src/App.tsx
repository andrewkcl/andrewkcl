import { useMemo, useState } from "react";
import "./App.css";

interface Task {
  id: number;
  title: string;
  done: boolean;
}

let nextId = 3;

const initialTasks: Task[] = [
  { id: 1, title: "Scaffold the Vite + React app", done: true },
  { id: 2, title: "Wire up the Cloud Agent environment", done: false },
];

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [draft, setDraft] = useState("");

  const remaining = useMemo(
    () => tasks.filter((task) => !task.done).length,
    [tasks],
  );

  function addTask() {
    const title = draft.trim();
    if (!title) return;
    setTasks((prev) => [...prev, { id: nextId++, title, done: false }]);
    setDraft("");
  }

  function toggleTask(id: number) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    );
  }

  function removeTask(id: number) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  return (
    <main className="app">
      <header className="app__header">
        <h1>andrewkcl · Task Board</h1>
        <p className="app__subtitle">
          {remaining} task{remaining === 1 ? "" : "s"} remaining
        </p>
      </header>

      <form
        className="composer"
        onSubmit={(event) => {
          event.preventDefault();
          addTask();
        }}
      >
        <input
          className="composer__input"
          aria-label="New task title"
          placeholder="Add a new task…"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
        />
        <button className="composer__button" type="submit">
          Add task
        </button>
      </form>

      <ul className="task-list">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`task-list__item${task.done ? " is-done" : ""}`}
          >
            <label className="task-list__label">
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTask(task.id)}
              />
              <span>{task.title}</span>
            </label>
            <button
              className="task-list__remove"
              type="button"
              aria-label={`Remove ${task.title}`}
              onClick={() => removeTask(task.id)}
            >
              ×
            </button>
          </li>
        ))}
      </ul>

      {tasks.length === 0 && (
        <p className="task-list__empty">No tasks yet — add one above.</p>
      )}
    </main>
  );
}
