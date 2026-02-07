const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    token: { type: String, default: null } // Stores the active session token for single device login
});

module.exports = mongoose.model('User', userSchema);
