const { findNearestWarehouse } = require("../services/warehouseService");

const getNearestWarehouse = async (req, res) => {
    const { sellerId, productId } = req.query;

    if (!sellerId || !productId) {
        return res.status(400).json({ error: "Missing sellerId or productId" });
    }

    try {
        const nearestWarehouse = await findNearestWarehouse(sellerId, productId);
        res.json(nearestWarehouse);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getNearestWarehouse };
