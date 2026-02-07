const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }], // Snapshot of items
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
