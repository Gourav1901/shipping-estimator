const express = require("express");
const { getShippingCharge, calculateShippingChargeForWareHouseToCustomer } = require("../controllers/shippingController");

const router = express.Router();
router.post("/calculate", getShippingCharge);
router.post("/charge",calculateShippingChargeForWareHouseToCustomer );

module.exports = router;
