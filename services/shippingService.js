const Customer = require("../models/customerModel");
const haversineDistance = require("../config/distanceCalculator");
const { findNearestWarehouse } = require("./warehouseService");


const calculateCharge = (distance, weight = 1, deliverySpeed) => {
    let rate;

    if (distance > 500) rate = 1; // Aeroplane
    else if (distance > 100) rate = 2; // Truck
    else rate = 3; // Mini Van

    let charge = distance * rate * weight;
    if (deliverySpeed === "express") {
        charge += 1.2 * weight;
    }

    return Math.round(charge + 10); // Standard courier fee
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

const calculateShipping = async (seller, customerId, deliverySpeed) => {
    const customer = await Customer.findById(customerId);
    if (!customer) throw new Error("Customer not found!");

    const { warehouse, distance } = await findNearestWarehouse(seller.location);
    console.log(seller, "seller")
    const weight = seller.products.reduce((total, product) => total + product.weight, 0);
    const shippingCharge = calculateCharge(distance, weight, deliverySpeed);

    return {
        warehouse,
        shippingCharge,
    };
};

module.exports = { calculateCharge, calculateCombinedCharge, calculateShipping };
