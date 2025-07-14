const express = require('express');
const {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  approveJob,
} = require('../controllers/jobController');
const { authenticate } = require('../middleware/authMiddleware');
const { restrictTo } = require('../middleware/roleMiddleware');

const router = express.Router();

router.get('/', getAllJobs);
router.get('/:id', getJobById);
router.post('/', authenticate, restrictTo('employer'), createJob);
router.put('/:id', authenticate, restrictTo('employer', 'admin'), updateJob);
router.delete('/:id', authenticate, restrictTo('employer', 'admin'), deleteJob);
router.patch('/:id/approve', authenticate, restrictTo('admin'), approveJob);

module.exports = router;
