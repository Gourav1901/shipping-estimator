const express = require("express");
const {
    calculateShippingCharge,
    getShippingCharge,
} = require("../controllers/shippingController");
const router = express.Router();

router.get("/", getShippingCharge);
router.post("/calculate", calculateShippingCharge);

module.exports = router;
