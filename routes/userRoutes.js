const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');

const userController = require('../controllers/userController');
router.post('/users', userController.createUser);

// Protect routes with authMiddleware
router.use(authMiddleware);

router.get('/users/:userId', userController.getUser);
router.put('/users/:userId', userController.updateUser);
router.delete('/users/:userId', userController.deleteUser);

module.exports = router;
