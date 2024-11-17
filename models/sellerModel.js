const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema({
    name: String,
    location: {
        lat: Number,
        lng: Number,
    },
    products: [
        {
            name: String,
            weight: Number, // in kg
            dimensions: String,
        },
    ],
});

module.exports = mongoose.model("Seller", sellerSchema);
