const Warehouse = require("../models/warehouseModel");
const haversineDistance = require("../config/distanceCalculator");

const findNearestWarehouse = async (sellerLocation) => {
  const warehouses = await Warehouse.find();
  if (!warehouses.length) {
    throw new Error("No warehouses available");
  }
  let nearestWarehouse = warehouses[0];
  let minDistance = haversineDistance(sellerLocation, warehouses[0].location);

  warehouses.forEach((warehouse) => {
    const distance = haversineDistance(sellerLocation, warehouse.location);
    if (distance < minDistance) {
      minDistance = distance;
      nearestWarehouse = warehouse;
    }
  });

  return {
    warehouseId: nearestWarehouse._id,
    warehouseLocation: nearestWarehouse.location,
  };
};

module.exports = { findNearestWarehouse };
