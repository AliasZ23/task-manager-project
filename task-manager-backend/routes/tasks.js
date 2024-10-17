const mongoose = require('mongoose');

// Define Task schema
const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

// Export Task model
module.exports = mongoose.model('Task', TaskSchema);
