const express = require('express');
const ShippingService = require('../services/shippingService');
const router = express.Router();

router.get('/nearest', async (req, res, next) => {
    try {
        const { sellerId, productId } = req.query;
        if (!sellerId || !productId) {
            return res.status(400).json({ error: 'Missing required parameters' });
        }

        const warehouse = await ShippingService.findNearestWarehouse(sellerId, productId);
        res.json(warehouse);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
