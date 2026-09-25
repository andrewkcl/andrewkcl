let nextId = 1;
let tasks = [];

export function reset(seed = []) {
  tasks = [];
  nextId = 1;
  for (const title of seed) {
    addTask(title);
  }
  return listTasks();
}

export function listTasks() {
  return tasks.map((task) => ({ ...task }));
}

export function addTask(title) {
  const trimmed = typeof title === "string" ? title.trim() : "";
  if (!trimmed) {
    throw new Error("Task title must be a non-empty string");
  }
  const task = { id: nextId++, title: trimmed, done: false };
  tasks.push(task);
  return { ...task };
}

export function toggleTask(id) {
  const task = tasks.find((t) => t.id === id);
  if (!task) {
    return null;
  }
  task.done = !task.done;
  return { ...task };
}

export function removeTask(id) {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) {
    return false;
  }
  tasks.splice(index, 1);
  return true;
}
