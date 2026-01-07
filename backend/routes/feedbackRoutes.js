
const express = require('express');
const router = express.Router();
const { getAllFeedback, getStudentFeedback, createFeedback } = require('../controllers/feedbackController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/all', getAllFeedback);

router.get('/student/:studentId', getStudentFeedback);
router.post('/', createFeedback);

module.exports = router;
