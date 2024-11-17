const { calculateCharge, calculateCombinedCharge } = require("../services/shippingService");

const getShippingCharge = async (req, res) => {
    const { warehouseId, customerId, deliverySpeed } = req.query;

    if (!warehouseId || !customerId || !deliverySpeed) {
        return res.status(400).json({ error: "Missing parameters" });
    }

    try {
        const charge = await calculateCharge(warehouseId, customerId, deliverySpeed);
        res.json({ shippingCharge: charge });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const calculateShippingCharge = async (req, res) => {
    const { sellerId, customerId, deliverySpeed } = req.body;

    if (!sellerId || !customerId || !deliverySpeed) {
        return res.status(400).json({ error: "Missing parameters" });
    }

    try {
        const result = await calculateCombinedCharge(sellerId, customerId, deliverySpeed);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getShippingCharge, calculateShippingCharge };
