const Customer = require("../models/customerModel");
const haversineDistance = require("../config/distanceCalculator");

const calculateCharge = async (warehouseId, customerId, deliverySpeed) => {
    const customer = await Customer.findById(customerId);
    const warehouse = await Warehouse.findById(warehouseId);

    if (!customer || !warehouse) {
        throw new Error("Invalid warehouse or customer ID");
    }

    const distance = haversineDistance(warehouse.location, customer.location);
    let transportModeRate;

    if (distance > 500) {
        transportModeRate = 1; // Aeroplane
    } else if (distance > 100) {
        transportModeRate = 2; // Truck
    } else {
        transportModeRate = 3; // Mini Van
    }

    const baseCharge = distance * transportModeRate;
    const deliveryCharge = deliverySpeed === "express" ? baseCharge + 1.2 : baseCharge;

    return Math.round(deliveryCharge + 10); // Standard courier charge is Rs 10
};

const calculateCombinedCharge = async (sellerId, customerId, deliverySpeed) => {
    const seller = await Seller.findById(sellerId);
    if (!seller) {
        throw new Error("Invalid seller ID");
    }

    const nearestWarehouse = await findNearestWarehouse(seller.location);
    const shippingCharge = await calculateCharge(
        nearestWarehouse.warehouseId,
        customerId,
        deliverySpeed
    );

    return { shippingCharge, nearestWarehouse };
};

module.exports = { calculateCharge, calculateCombinedCharge };
