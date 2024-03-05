import express from "express";
import { tasksRouter } from "./routes/tasks.js";

const app = express();
app.use(express.json());

app.use("/api/tasks", tasksRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

/*const fs = require('fs');

// POST a new task
app.post('/tasks', (req, res) => {
  const newTask = {
    id: generateId(),
    ...req.body,
  };
  tasks.push(newTask);
  fs.writeFileSync('data.json', JSON.stringify(tasks, null, 2)); // Update data file
  res.status(201).json(newTask);
});

// PUT update a specific task
app.put('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedTask = req.body;
  const index = tasks.findIndex(task => task.id === id);
  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...updatedTask };
    fs.writeFileSync('data.json', JSON.stringify(tasks, null, 2));
    res.json(tasks[index]);
  } else {
    res.status(404).send('Task not found');
  }
});

// DELETE a specific task
app.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex(task => task.id === id);
  if (index !== -1) {
    tasks.splice(index, 1);
    fs.writeFileSync('data.json', JSON.stringify(tasks, null, 2));
    res.sendStatus(204); // No content
  } else {
    res.status(404).send('Task not found');
  }
});*/
