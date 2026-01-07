
const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    studentName: {
        type: String,
        required: true
    },
    feedbackText: {
        type: String,
        required: true
    },
    sentiment: {
        type: String,
        uppercase: true,
        enum: ['POSITIVE', 'NEUTRAL', 'NEGATIVE'],
        default: 'NEUTRAL'
    },
    category: {
        type: String,
        // Enum validation as requested
        enum: ['Teaching', 'Facilities', 'Exams', 'Labs', 'Hostel', 'Others'],
        default: 'Others'
    },
    summary: {
        type: String
    },
    isCritical: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Feedback', feedbackSchema);
