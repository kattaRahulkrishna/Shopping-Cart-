const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true }, // Added image URL
    status: { type: String, default: 'Available' },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Item', itemSchema);
