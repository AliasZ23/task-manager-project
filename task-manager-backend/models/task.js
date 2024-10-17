const mongoose = require('mongoose');

// Define the schema for a Task
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // The title of the task is mandatory
  },
  completed: {
    type: Boolean,
    default: false, // By default, tasks are not completed
  },
  created_at: {
    type: Date,
    default: Date.now, // Automatically set the creation date
  }
});

// Create a model from the schema
const Task = mongoose.model('Task', taskSchema);

// Export the Task model so it can be used in other files
module.exports = Task;
