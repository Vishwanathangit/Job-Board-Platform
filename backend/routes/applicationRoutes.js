const express = require('express');
const {
  createApplication,
  getApplicationsByUser,
  getApplicationsByJob
} = require('../controllers/applicationController');
const { authenticate } = require('../middleware/authMiddleware');
const { restrictTo } = require('../middleware/roleMiddleware');

const router = express.Router();

router.post('/', authenticate, restrictTo('candidate'), createApplication);
router.get('/user/:userId', authenticate, getApplicationsByUser);
router.get('/job/:jobId', authenticate, restrictTo('employer', 'admin'), getApplicationsByJob);

module.exports = router;
