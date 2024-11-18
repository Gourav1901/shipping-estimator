const { calculateShipping, calculateCharge } = require("../services/shippingService");
const Seller = require("../models/sellerModel");
const warehouseModel = require("../models/warehouseModel");
const customerModel = require("../models/customerModel");
const haversineDistance = require("../config/distanceCalculator");

const getShippingCharge = async (req, res, next) => {
    try {
        const { sellerId, customerId, deliverySpeed } = req.body;

        const seller = await Seller.findById(sellerId);
        if (!seller) throw new Error("Seller not found!");

        const shippingData = await calculateShipping(seller, customerId, deliverySpeed);
        res.json(shippingData);
    } catch (error) {
        next(error);
    }
};

const calculateShippingChargeForWareHouseToCustomer = async (req, res, next) => {
    try {
        const { warehouseId, customerId, deliverySpeed } = req.query;

        // Validate query parameters
        if (!warehouseId || !customerId || !deliverySpeed) {
            return res.status(400).json({
                error: "warehouseId, customerId, and deliverySpeed are required.",
            });
        }

        // Fetch warehouse and customer data
        const warehouse = await warehouseModel.findById(warehouseId);
        const customer = await customerModel.findById(customerId);
        console.log(warehouse, "warehouse")
        console.log(customer, "customer")
        if (!warehouse) {
            return res.status(404).json({ error: "Warehouse not found." });
        }
        if (!customer) {
            return res.status(404).json({ error: "Customer not found." });
        }

        // Calculate the distance between warehouse and customer
        const distance = haversineDistance(warehouse.location, customer.location);
        console.log(distance, "distance")
        // Calculate the shipping charge
        console.log(distance, deliverySpeed, "distance deliveryspped")
        const shippingCharge = calculateCharge(distance, deliverySpeed);
        console.log(shippingCharge, "shipping charge")

        // Return only the shipping charge
        res.status(200).json({ shippingCharge });
    } catch (error) {
        next(error); // Pass to error handler middleware
    }
};

module.exports = { getShippingCharge, calculateShippingChargeForWareHouseToCustomer };
