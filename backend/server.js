const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/bookings', bookingRoutes);

// Base route for testing
app.get('/', (req, res) => {
    res.send('Gym Apparel API is running...');
});

// Database connection
const PORT = process.env.PORT || 5000;
const DB_URI = process.env.MONGODB_URI;

mongoose.set('strictQuery', false);

mongoose.connect(DB_URI)
    .then(() => {
        console.log('Successfully connected to MongoDB Atlas!');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err.message);
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT} (Database connection failed)`);
        });
    });