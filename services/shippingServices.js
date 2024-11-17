const Customer = require('../models/Customer');
const Warehouse = require('../models/Warehouse');
const Product = require('../models/Product');
const Seller = require('../models/Seller');

const TRANSPORT_MODES = {
    MINI_VAN: { maxDistance: 100, ratePerKmKg: 3 },
    TRUCK: { maxDistance: 500, ratePerKmKg: 2 },
    AEROPLANE: { ratePerKmKg: 1 }
};

const SPEED_MULTIPLIERS = {
    standard: 1,
    express: 1.5
};

class ShippingService {
    static async findNearestWarehouse(sellerId, productId) {
        const seller = await Seller.findById(sellerId);
        if (!seller) throw new Error('Seller not found');

        const warehouses = await Warehouse.find({
            location: {
                $near: {
                    $geometry: seller.location,
                    $maxDistance: 1000000 // 1000km in meters
                }
            },
            isActive: true
        }).limit(1);

        if (!warehouses.length) throw new Error('No warehouse found');
        return warehouses[0];
    }

    static async calculateDistance(point1, point2) {
        // Using the Haversine formula
        const R = 6371; // Earth's radius in km
        const [lon1, lat1] = point1.coordinates;
        const [lon2, lat2] = point2.coordinates;
        
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                Math.sin(dLon/2) * Math.sin(dLon/2);
        
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    }

    static determineTransportMode(distance) {
        if (distance <= TRANSPORT_MODES.MINI_VAN.maxDistance) {
            return { mode: 'MINI_VAN', rate: TRANSPORT_MODES.MINI_VAN.ratePerKmKg };
        } else if (distance <= TRANSPORT_MODES.TRUCK.maxDistance) {
            return { mode: 'TRUCK', rate: TRANSPORT_MODES.TRUCK.ratePerKmKg };
        } else {
            return { mode: 'AEROPLANE', rate: TRANSPORT_MODES.AEROPLANE.ratePerKmKg };
        }
    }

    static async calculateCharge(warehouseId, customerId, deliverySpeed = 'standard') {
        const [warehouse, customer] = await Promise.all([
            Warehouse.findById(warehouseId),
            Customer.findById(customerId)
        ]);

        if (!warehouse || !customer) {
            throw new Error('Warehouse or customer not found');
        }

        const distance = await this.calculateDistance(warehouse.location, customer.location);
        const { rate } = this.determineTransportMode(distance);
        const speedMultiplier = SPEED_MULTIPLIERS[deliverySpeed] || SPEED_MULTIPLIERS.standard;

        // Base calculation: distance * rate * speedMultiplier
        // This is a simplified version - you might want to add more factors
        return distance * rate * speedMultiplier;
    }
}

module.exports = ShippingService;
