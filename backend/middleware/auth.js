const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(verified._id);

        if (!user) {
            return res.status(401).send('User not found');
        }

        // Single device enforcement
        if (token !== user.token) {
            return res.status(403).send('Session invalid or logged out');
        }

        req.user = user;
        req.user.token = token; // accessible if needed
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
};

module.exports = auth;
