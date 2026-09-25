import express from "express";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { addTask, listTasks, removeTask, toggleTask } from "./store.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

export function createApp() {
  const app = express();
  app.use(express.json());

  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", uptime: process.uptime() });
  });

  app.get("/api/tasks", (_req, res) => {
    res.json({ tasks: listTasks() });
  });

  app.post("/api/tasks", (req, res) => {
    try {
      const task = addTask(req.body?.title);
      res.status(201).json({ task });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  app.post("/api/tasks/:id/toggle", (req, res) => {
    const id = Number(req.params.id);
    const task = toggleTask(id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json({ task });
  });

  app.delete("/api/tasks/:id", (req, res) => {
    const id = Number(req.params.id);
    const removed = removeTask(id);
    if (!removed) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(204).end();
  });

  app.use(express.static(join(__dirname, "..", "public")));

  return app;
}
