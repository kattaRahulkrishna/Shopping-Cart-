const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

// Signup
router.post('/', async (req, res) => {
    try {
        const { username, password } = req.body;
        // Check if user exists
        const userExists = await User.findOne({ username });
        if (userExists) return res.status(400).send('Username already exists');

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            username,
            password: hashedPassword
        });
        await user.save();
        res.status(201).send('User created');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// List Users
router.get('/', async (req, res) => {
    try {
        const users = await User.find({}, '-password -token');
        res.json(users);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) return res.status(400).send('Invalid username/password'); // Generic message

        // Check password
        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) return res.status(400).send('Invalid username/password');

        // Check if user is already logged in on another device
        if (user.token) {
            // As per requirements: "If a user already has an account, the user will login... A user can only be logged in from a single device at a time."
            // "Prevention: Checking if a token already exists... If a token is present, the system denies access"
            return res.status(403).send('User is already logged in on another device.');
        }

        // Generate token
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

        // Save token to DB
        user.token = token;
        await user.save();

        res.header('Authorization', token).send({ token });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Logout
router.post('/logout', auth, async (req, res) => {
    try {
        // Clear token
        req.user.token = null;
        await req.user.save();
        res.send('Logged out successfully');
    } catch (err) {
        res.status(500).send('Error during logout');
    }
});

module.exports = router;
