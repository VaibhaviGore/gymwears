const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
        min: [0, 'Price must be positive']
    },
    image: {
        type: String,
        required: [true, 'Product image URL is required']
    },
    category: {
        type: String,
        required: [true, 'Product category is required']
    },
    description: {
        type: String
    },
    stock: {
        type: Number,
        default: 0
    },
    sizes: {
        type: [String],
        default: []
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
