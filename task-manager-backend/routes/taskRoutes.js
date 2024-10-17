const express = require('express');
const router = express.Router();
const Task = require('../models/Task');  // Import the Task model

// Get all tasks
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();  // Fetch all tasks
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single task by ID
router.get('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);  // Fetch task by ID
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new task
router.post('/tasks', async (req, res) => {
  const task = new Task({
    title: req.body.title
  });

  try {
    const newTask = await task.save();  // Save task to database
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a task
router.patch('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);  // Find task by ID
    if (!task) return res.status(404).json({ message: 'Task not found' });

    // Update task properties
    if (req.body.title) task.title = req.body.title;
    if (req.body.completed !== undefined) task.completed = req.body.completed;

    const updatedTask = await task.save();  // Save updated task
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a task
router.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);  // Delete task by ID
    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
