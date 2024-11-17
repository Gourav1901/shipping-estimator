const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller',
        required: true
    },
    weight: {
        type: Number,
        required: true,
        min: 0
    },
    dimensions: {
        length: Number,
        width: Number,
        height: Number
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
