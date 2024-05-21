const express = require('express');
const router = express.Router();
const subtaskController = require('../controllers/subtaskController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.get('/tasks/:taskId/subtasks', subtaskController.getSubtasks);
router.put('/tasks/:taskId/subtasks', subtaskController.updateSubtasks);
router.post('/tasks/:taskId/subtasks', subtaskController.createSubtask); 

module.exports = router;
