const express = require('express');
const ShippingService = require('../services/shippingService');
const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const { warehouseId, customerId, deliverySpeed } = req.query;
        if (!warehouseId || !customerId) {
            return res.status(400).json({ error: 'Missing required parameters' });
        }

        const charge = await ShippingService.calculateCharge(warehouseId, customerId, deliverySpeed);
        res.json({ charge });
    } catch (error) {
        next(error);
    }
});

router.post('/calculate', async (req, res, next) => {
    try {
        const { sellerId, productId, customerId, deliverySpeed } = req.body;
        if (!sellerId || !productId || !customerId) {
            return res.status(400).json({ error: 'Missing required parameters' });
        }

        const warehouse = await ShippingService.findNearestWarehouse(sellerId, productId);
        const charge = await ShippingService.calculateCharge(warehouse._id, customerId, deliverySpeed);
        
        res.json({
            warehouse,
            charge
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
