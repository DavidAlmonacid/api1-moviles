import { Router } from "express";
import fs from "node:fs/promises";
import path from "node:path";
import tasks from "../mocks/tasks.json" assert { type: "json" };

export const tasksRouter = Router();

tasksRouter.get("/", (req, res) => {
  res.json(tasks);
});

tasksRouter.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find((task) => task.id === id);

  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ message: "Task not found" });
  }
});

tasksRouter.post("/", async (req, res) => {
  const { title } = req.body;
  const newTask = {
    id: tasks.length + 1,
    title,
    completed: false
  };

  tasks.push(newTask);

  try {
    await fs.writeFile(
      path.resolve(process.cwd(), "src/mocks/tasks.json"),
      JSON.stringify(tasks, null, 2)
    );

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
