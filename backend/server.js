require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/shopping-cart')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Routes
app.use('/users', require('./routes/userRoutes'));
app.use('/items', require('./routes/itemRoutes'));
app.use('/carts', require('./routes/cartRoutes'));
app.use('/orders', require('./routes/orderRoutes'));

app.get('/', (req, res) => {
    res.send('Shopping Cart API Running');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
