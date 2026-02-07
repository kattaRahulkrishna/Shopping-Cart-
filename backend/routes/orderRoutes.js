const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const auth = require('../middleware/auth');

// Create Order (Checkout)
router.post('/', auth, async (req, res) => {
    try {
        // "Cart will get converted into an order"
        // Find user's cart
        const cart = await Cart.findOne({ user: req.user._id });
        if (!cart || cart.items.length === 0) {
            return res.status(400).send('Cart is empty');
        }

        const order = new Order({
            user: req.user._id,
            items: cart.items
        });
        await order.save();

        // Clear cart
        cart.items = [];
        await cart.save();
        // Or delete cart: await Cart.findByIdAndDelete(cart._id); 
        // "A single user can have only a single cart" implies it persists? 
        // Clearing items is safer to keep the ID, but deleting is also fine. 
        // I'll clear items.

        res.status(201).json({ message: 'Order successful', orderId: order._id });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// List Orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find().populate('items').populate('user', 'username');
        res.json(orders);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Helper for "Order History button to list all the placed orders for the user"
router.get('/mine', auth, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).populate('items');
        res.json(orders);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
