const taskList = document.getElementById("task-list");
const emptyState = document.getElementById("empty-state");
const form = document.getElementById("new-task-form");
const input = document.getElementById("new-task-input");

async function api(path, options) {
  const res = await fetch(path, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok && res.status !== 204) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed: ${res.status}`);
  }
  return res.status === 204 ? null : res.json();
}

function render(tasks) {
  taskList.replaceChildren();
  emptyState.hidden = tasks.length > 0;

  for (const task of tasks) {
    const li = document.createElement("li");
    li.className = `task${task.done ? " task--done" : ""}`;

    const toggle = document.createElement("input");
    toggle.type = "checkbox";
    toggle.className = "task__toggle";
    toggle.checked = task.done;
    toggle.setAttribute("aria-label", `Mark "${task.title}" as done`);
    toggle.addEventListener("change", () => onToggle(task.id));

    const title = document.createElement("span");
    title.className = "task__title";
    title.textContent = task.title;

    const del = document.createElement("button");
    del.className = "task__delete";
    del.type = "button";
    del.textContent = "×";
    del.setAttribute("aria-label", `Delete "${task.title}"`);
    del.addEventListener("click", () => onDelete(task.id));

    li.append(toggle, title, del);
    taskList.append(li);
  }
}

async function refresh() {
  const { tasks } = await api("/api/tasks");
  render(tasks);
}

async function onToggle(id) {
  await api(`/api/tasks/${id}/toggle`, { method: "POST" });
  await refresh();
}

async function onDelete(id) {
  await api(`/api/tasks/${id}`, { method: "DELETE" });
  await refresh();
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const title = input.value.trim();
  if (!title) return;
  await api("/api/tasks", {
    method: "POST",
    body: JSON.stringify({ title }),
  });
  input.value = "";
  input.focus();
  await refresh();
});

refresh().catch((err) => {
  emptyState.hidden = false;
  emptyState.textContent = `Failed to load tasks: ${err.message}`;
});
