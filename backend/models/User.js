
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        sparse: true, // Allow null/undefined to not clash uniqueness if multiple have no email
        required: function () { return this.role === 'STAFF'; }
    },
    rollNumber: {
        type: String,
        unique: true,
        sparse: true,
        required: function () { return this.role === 'STUDENT'; }
    },
    role: {
        type: String,
        enum: ['STUDENT', 'STAFF'],
        default: 'STUDENT',
        required: true
    },
    password: {
        type: String,
        required: function () { return this.role === 'STAFF'; }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);
