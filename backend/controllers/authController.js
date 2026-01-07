
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// @desc    Register new user
// @route   POST /api/auth/register
const registerUser = async (req, res) => {
    try {
        const { name, email, password, role, rollNumber } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please add all fields' });
        }

        // Validate Roll Number for Students
        const userRole = role ? role.toUpperCase() : 'STUDENT';
        if (userRole === 'STUDENT' && !rollNumber) {
            return res.status(400).json({ message: 'Roll Number is required for Students' });
        }

        // Check user existence
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Check roll number existence if student
        if (userRole === 'STUDENT') {
            const rollExists = await User.findOne({ rollNumber });
            if (rollExists) {
                return res.status(400).json({ message: 'Roll Number already registered' });
            }
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: userRole,
            rollNumber: userRole === 'STUDENT' ? rollNumber : undefined
        });

        if (user) {
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Authenticate a user
// @route   POST /api/auth/login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check for user email
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            });
        } else {
            res.status(400).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user data
// @route   GET /api/auth/me
const getMe = async (req, res) => {
    // Without JWT, we don't have a secure way to get 'me' from a token.
    // This endpoint might be deprecated or need a session ID.
    // For now, we'll return 400 or just pass through.
    res.status(400).json({ message: 'Session management not implemented without JWT' });
};

module.exports = {
    registerUser,
    loginUser,
    getMe
};
