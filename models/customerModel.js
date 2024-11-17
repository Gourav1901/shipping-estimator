const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
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

customerSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Customer', customerSchema);
