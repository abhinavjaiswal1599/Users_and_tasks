const express = require('express');
const router = express.Router();
const subtaskController = require('../controllers/subtaskController');
const authMiddleware = require('../middlewares/authMiddleware');

// Protect routes with authMiddleware
router.use(authMiddleware);

router.get('/tasks/:taskId/subtasks', subtaskController.getSubtasks);
router.put('/tasks/:taskId/subtasks', subtaskController.updateSubtasks);
router.post('/tasks/:taskId/subtasks', subtaskController.createSubtask); // Ensure you have this function in your controller

module.exports = router;
