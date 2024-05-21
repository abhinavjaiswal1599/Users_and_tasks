const User = require('../models/User');

// Get all non-deleted subtasks for a task
exports.getSubtasks = async (req, res) => {
  try {
    const { taskId } = req.params;

    const user = await User.findById(req.user.id).populate('tasks');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const task = user.tasks.id(taskId);
    if (!task || task.deleted) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    res.json({ success: true, data: task.subtasks.filter(subtask => !subtask.deleted)
    });
} catch (err) {
  res.status(500).json({ success: false, message: err.message });
}
};

// Update subtasks for a task
exports.updateSubtasks = async (req, res) => {
try {
  const { taskId } = req.params;
  const { subtasks } = req.body;

  const user = await User.findById(req.user.id).populate('tasks');
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  const task = user.tasks.id(taskId);
  if (!task || task.deleted) {
    return res.status(404).json({ success: false, message: 'Task not found' });
  }

  // Mark existing subtasks as deleted
  task.subtasks.forEach(subtask => {
    subtask.deleted = true;
  });

  // Add or update subtasks
  await Promise.all(subtasks.map(async subtaskData => {
    const existingSubtask = task.subtasks.id(subtaskData._id);
    if (existingSubtask) {
      Object.assign(existingSubtask, subtaskData);
      existingSubtask.deleted = false;
    } else {
      task.subtasks.push(subtaskData);
    }
  }));

  await user.save();

  res.json({ success: true, data: task.subtasks.filter(subtask => !subtask.deleted) });
} catch (err) {
  res.status(500).json({ success: false, message: err.message });
}
};

// Create new subtasks for a task
// exports.createSubtask = async (req, res) => {
//     try {
//       const { taskId } = req.params;
//       const subtasksData = req.body; // Assuming subtasksData is an array of subtask objects
  
//       const user = await User.findById(req.user.id);
//       if (!user) {
//         return res.status(404).json({ success: false, message: 'User not found' });
//       }
  
//       const task = user.tasks.id(taskId);
//       if (!task || task.deleted) {
//         return res.status(404).json({ success: false, message: 'Task not found' });
//       }
  
//       // Push each subtask object in subtasksData array to the task's subtasks array
//       task.subtasks.push(...subtasksData);
//       await user.save();
  
//       res.status(201).json({ success: true, data: task.subtasks.filter(subtask => !subtask.deleted) });
//     } catch (err) {
//       res.status(500).json({ success: false, error: err.message });
//     }
//   };
  
exports.createSubtask = async (req, res) => {
    try {
      const { taskId } = req.params;
      const subtasksData = req.body;
  
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      const task = user.tasks.id(taskId);
      if (!task || task.deleted) {
        return res.status(404).json({ success: false, message: 'Task not found' });
      }
  
      // Ensure subtasksData is an array
      if (!Array.isArray(subtasksData)) {
        return res.status(400).json({ success: false, message: 'Subtasks data must be an array' });
      }
  
      // Validate each subtask object in subtasksData array
      for (const subtask of subtasksData) {
        if (!subtask.subject || !subtask.deadline || !subtask.status) {
          return res.status(400).json({ success: false, message: 'Each subtask must have subject, deadline, and status' });
        }
      }
  
      // Push each subtask object in subtasksData array to the task's subtasks array
      task.subtasks.push(...subtasksData);
      await user.save();
  
      res.status(201).json({ success: true, data: task.subtasks.filter(subtask => !subtask.deleted) });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  };
  
  