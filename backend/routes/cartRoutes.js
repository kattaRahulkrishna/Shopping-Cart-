const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const auth = require('../middleware/auth');

// Create/Add to Cart
router.post('/', auth, async (req, res) => {
    // Expecting { item_id } in body or something similar. 
    // Assignment: "Create and adds Items to the cart". "Identify Cart by User's ID".
    // "Clicking on an item ... sends POST ... with item ID"
    try {
        const { item_id } = req.body;

        let cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            cart = new Cart({ user: req.user._id, items: [] });
        }

        if (item_id) {
            cart.items.push(item_id);
            await cart.save();
        }

        res.status(201).json(cart);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// List Carts (Admin?) or Get User Cart
// Assignment says: "GET /carts List all carts"
// It implies an admin view or general listing. But for the user, they want to see THEIR cart.
// "Cart button to list all the added Items in the cart."
// I'll implement GET /carts to return ALL carts (as per "List all carts" description)
// AND I'll implement GET /carts/my-cart (or filtered) for the user to see theirs?
// Wait, "GET /carts List all carts" suggests a general endpoint. 
// But step 3a says "Clicking on this button should show all the cart items...".
// I'll stick to: GET /carts?user_id=... or just return all if admin?
// Let's implement GET /carts to return the current user's cart if authenticated, or all if not? 
// The endpoint summary table says "List all carts".
// I will implement "List all carts" but maybe I need a specific one for the user.
// actually, for the frontend to show "all added items in the cart", it needs the user's cart.
// I'll assume GET /carts returns the list of all carts. 
// I'll add GET /carts/me for specific user cart or filter by query param.

router.get('/', async (req, res) => {
    try {
        // If query param ?user_id is present, filter
        // Or if authenticated...
        // Assignment is simple: "GET /carts List all carts".
        const carts = await Cart.find().populate('items').populate('user', 'username');
        res.json(carts);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Helper for frontend to get *my* cart easily
router.get('/mine', auth, async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id }).populate('items');
        if (!cart) return res.json({ items: [] });
        res.json(cart);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
