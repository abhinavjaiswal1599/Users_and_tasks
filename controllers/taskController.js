const User = require('../models/User');

// Get all tasks with non-deleted subtasks
exports.getTasks = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('tasks');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const tasks = user.tasks.filter(task => !task.deleted).map(task => ({
      ...task.toObject(),
      subtasks: task.subtasks.filter(subtask => !subtask.deleted)
    }));

    res.json({ success: true, data: tasks });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Add Task
exports.addTask = async (req, res) => {
  try {
    const { subject, deadline, status, subtasks } = req.body;

    if (!req.user) {
      return res.status(401).json({ success: false, message: 'User not authenticated' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const newTask = {
      subject,
      deadline,
      status,
      subtasks: subtasks || []
    };

    user.tasks.push(newTask);
    await user.save();

    res.status(201).json({ success: true, data: newTask });
  } catch (err) {
    console.error('Error adding task:', err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update Task
exports.updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { subject, deadline, status } = req.body;

    if (!req.user) {
      return res.status(401).json({ success: false, message: 'User not authenticated' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const task = user.tasks.id(taskId);
    if (!task || task.deleted) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    if (subject) task.subject = subject;
    if (deadline) task.deadline = deadline;
    if (status) task.status = status;

    await user.save();

    res.json({ success: true, data: task });
  } catch (err) {
    console.error('Error updating task:', err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete Task
exports.deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const task = user.tasks.id(taskId);
    if (!task || task.deleted) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    task.deleted = true;
    await user.save();

    res.json({ success: true, message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
