const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String
  }
}, { timestamps: true });

sellerSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Seller', sellerSchema);
