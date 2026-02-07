const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Cart', cartSchema);
