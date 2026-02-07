require('dotenv').config();
const mongoose = require('mongoose');
const Item = require('./models/Item');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/shopping-cart')
    .then(async () => {
        console.log('MongoDB connected');

        // Clear items
        await Item.deleteMany({});

        const items = [
            // Row 1
            {
                name: 'Red Velvet Evening Gown',
                price: 299.00,
                image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80',
                status: 'Available'
            },
            {
                name: 'Striped Summer Dress',
                price: 85.00,
                image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=600&q=80',
                status: 'Available'
            },
            {
                name: 'Floral Chiffon Dress',
                price: 95.00,
                image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80',
                status: 'Available'
            },

            // Row 2
            {
                name: 'Classic Beige Blazer',
                price: 180.00,
                image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80',
                status: 'Available'
            },

            // Row 3
            {
                name: 'Sequin Party Dress',
                price: 210.00,
                image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=600&q=80',
                status: 'Available'
            },
            {
                name: 'Emerald Silk Gown',
                price: 250.00,
                image: 'https://images.unsplash.com/photo-1512413914633-b5043f4041ea?auto=format&fit=crop&w=600&q=80',
                status: 'Available'
            },
            {
                name: 'Black Bodycon',
                price: 65.00,
                image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=600&q=80',
                status: 'Available'
            },

            // Accessories/More
            {
                name: 'Designer Sunglasses',
                price: 150.00,
                image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80',
                status: 'Available'
            },
            {
                name: 'Luxury Handbag',
                price: 450.00,
                image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80',
                status: 'Available'
            },
            {
                name: 'Stiletto Heels',
                price: 130.00,
                image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80',
                status: 'Available'
            },
            {
                name: 'Summer Hat',
                price: 45.00,
                image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=600&q=80',
                status: 'Available'
            },
            {
                name: 'Evening Clutch',
                price: 85.00,
                image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=600&q=80',
                status: 'Available'
            }
        ];

        await Item.insertMany(items);
        console.log('Data seeded');
        mongoose.connection.close();
    })
    .catch(err => {
        console.log(err);
        process.exit(1);
    });
