const Warehouse = require("../models/warehouseModel");
const haversineDistance = require("../config/distanceCalculator");

const findNearestWarehouse = async (sellerLocation) => {
    const warehouses = await Warehouse.find();
    if (warehouses.length === 0) {
        throw new Error("No warehouses found.");
    }

    let nearest = warehouses[0];
    let minDistance = haversineDistance(sellerLocation, warehouses[0].location);

    warehouses.forEach((warehouse) => {
        const distance = haversineDistance(sellerLocation, warehouse.location);
        if (distance < minDistance) {
            nearest = warehouse;
            minDistance = distance;
        }
    });

    return { warehouse: nearest, distance: minDistance };
};

module.exports = { findNearestWarehouse };
