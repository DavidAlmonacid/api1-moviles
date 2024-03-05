import { Router } from "express";
import { writeFile } from "node:fs/promises";
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
    await writeFile(
      path.resolve(process.cwd(), "src/mocks/tasks.json"),
      JSON.stringify(tasks, null, 2)
    );

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

tasksRouter.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const updatedTask = req.body;
  const index = tasks.findIndex((task) => task.id === id);

  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...updatedTask };

    try {
      await writeFile(
        path.resolve(process.cwd(), "src/mocks/tasks.json"),
        JSON.stringify(tasks, null, 2)
      );

      res.json(tasks[index]);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(404).json({ message: "Task not found" });
  }
});

tasksRouter.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  tasks.splice(index, 1);

  try {
    await writeFile(
      path.resolve(process.cwd(), "src/mocks/tasks.json"),
      JSON.stringify(tasks, null, 2)
    );

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
