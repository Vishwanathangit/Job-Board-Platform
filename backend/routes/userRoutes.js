const express = require('express');
const { getAllUsers, deleteUser } = require('../controllers/userController');
const { authenticate } = require('../middleware/authMiddleware');
const { restrictTo } = require('../middleware/roleMiddleware');

const router = express.Router();

router.get('/', authenticate, restrictTo('admin'), getAllUsers);
router.delete('/:id', authenticate, restrictTo('admin'), deleteUser);

module.exports = router;
