
const Feedback = require('../models/Feedback');
const User = require('../models/User');
const mongoose = require('mongoose');
const mockStore = require('../utils/mockStore');
const { analyzeFeedback } = require('../services/geminiService');

const isDbConnected = () => mongoose.connection.readyState === 1;

// @desc    Get all feedback (Staff only)
// @route   GET /api/feedback/all
// @access  Public (in this No-JWT version)
const getAllFeedback = async (req, res) => {
    try {
        let feedbacks;
        if (!isDbConnected()) {
            feedbacks = await mockStore.getFeedbacks();
        } else {
            feedbacks = await Feedback.find().sort({ createdAt: -1 });
        }

        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get specific student's feedback
// @route   GET /api/feedback/student/:studentId
// @access  Public (in this No-JWT version)
const getStudentFeedback = async (req, res) => {
    try {
        let feedbacks;
        if (!isDbConnected()) {
            feedbacks = await mockStore.getFeedbacks({ studentId: req.params.studentId });
        } else {
            feedbacks = await Feedback.find({ studentId: req.params.studentId }).sort({ createdAt: -1 });
        }

        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Submit new feedback
// @route   POST /api/feedbacks
// @access  Public (in this No-JWT version)
const createFeedback = async (req, res) => {
    try {
        const { text, studentName, studentId } = req.body;

        if (!text) {
            return res.status(400).json({ message: 'Feedback text is required' });
        }

        // --- AI ANALYSIS ---
        const analysis = await analyzeFeedback(text);
        // -------------------

        const feedbackData = {
            studentId,
            studentName,
            feedbackText: text,
            sentiment: (analysis.sentiment || 'NEUTRAL').toUpperCase(),
            category: analysis.category || 'Others',
            analysis: analysis
        };

        let feedback;
        if (!isDbConnected()) {
            feedback = await mockStore.createFeedback(feedbackData);
        } else {
            feedback = await Feedback.create(feedbackData);
        }

        res.status(201).json(feedback);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllFeedback,
    getStudentFeedback,
    createFeedback
};
