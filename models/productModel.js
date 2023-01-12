const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter product name'],
        unique: true
    },
    price: {
        type: Number,
        required: [true, 'Please enter product price'],
    },
    description: {
        type: String,
        required: [true, 'Please enter product description'],
    },
    amount: {
        type: Number,
        required: [true, 'Please enter product amount'],
    }
});

module.exports = mongoose.model('Product', productSchema);