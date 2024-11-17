const mongoose = require("mongoose");

const warehouseSchema = new mongoose.Schema({
    name: String,
    location: {
        lat: Number,
        lng: Number,
    },
});

const Warehouse = mongoose.model("Warehouse", warehouseSchema);

module.exports = Warehouse;
