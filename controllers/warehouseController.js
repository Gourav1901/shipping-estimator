const { findNearestWarehouse } = require("../services/warehouseService");

const getNearestWarehouse = async (req, res, next) => {
    try {
        const { sellerLocation } = req.query;

        if (!sellerLocation) {
            return res.status(400).json({ error: "Seller location is required." });
        }

        const warehouse = await findNearestWarehouse(JSON.parse(sellerLocation));
        res.json(warehouse);
    } catch (error) {
        next(error);
    }
};

module.exports = { getNearestWarehouse };
