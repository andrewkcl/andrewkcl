import { beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import { createApp } from "../src/app.js";
import { reset } from "../src/store.js";

const app = createApp();

beforeEach(() => {
  reset();
});

describe("task API", () => {
  it("reports health", async () => {
    const res = await request(app).get("/api/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
  });

  it("starts with no tasks", async () => {
    const res = await request(app).get("/api/tasks");
    expect(res.status).toBe(200);
    expect(res.body.tasks).toEqual([]);
  });

  it("creates a task", async () => {
    const res = await request(app).post("/api/tasks").send({ title: "Write tests" });
    expect(res.status).toBe(201);
    expect(res.body.task).toMatchObject({ id: 1, title: "Write tests", done: false });
  });

  it("rejects an empty title", async () => {
    const res = await request(app).post("/api/tasks").send({ title: "   " });
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  it("toggles a task done and back", async () => {
    await request(app).post("/api/tasks").send({ title: "Toggle me" });
    const toggled = await request(app).post("/api/tasks/1/toggle");
    expect(toggled.status).toBe(200);
    expect(toggled.body.task.done).toBe(true);

    const again = await request(app).post("/api/tasks/1/toggle");
    expect(again.body.task.done).toBe(false);
  });

  it("returns 404 when toggling a missing task", async () => {
    const res = await request(app).post("/api/tasks/999/toggle");
    expect(res.status).toBe(404);
  });

  it("deletes a task", async () => {
    await request(app).post("/api/tasks").send({ title: "Delete me" });
    const del = await request(app).delete("/api/tasks/1");
    expect(del.status).toBe(204);

    const list = await request(app).get("/api/tasks");
    expect(list.body.tasks).toEqual([]);
  });
});
