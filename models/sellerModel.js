const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema({
  name: String,
  products: [{
    name: String,
    price: Number,
    weight: Number, 
    dimensions: String,
  },
],
location: {
  lat: Number,
    lng: Number,
  },
});

const Seller = mongoose.model("Seller", sellerSchema);

module.exports = Seller;
