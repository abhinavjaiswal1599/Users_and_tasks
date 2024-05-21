
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define subtask schema
const subtaskSchema = new Schema({
  subject: { type: String, required: true },
  deadline: { type: Date, required: true },
  status: { type: String, required: true },
  deleted: { type: Boolean, default: false }
});

// Define task schema
const taskSchema = new Schema({
  subject: { type: String, required: true },
  deadline: { type: Date, required: true },
  status: { type: String, required: true },
  subtasks: [subtaskSchema],
  deleted: { type: Boolean, default: false }
});

// Define user schema
const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  tasks: [taskSchema]
});

module.exports = mongoose.model('User', userSchema);

