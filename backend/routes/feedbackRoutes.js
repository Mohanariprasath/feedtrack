
const express = require('express');
const router = express.Router();
const { getAllFeedback, getStudentFeedback, createFeedback, exportFeedback } = require('../controllers/feedbackController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/all', getAllFeedback);
router.get('/export', exportFeedback);

router.get('/student/:studentId', getStudentFeedback);
router.post('/', createFeedback);

module.exports = router;
