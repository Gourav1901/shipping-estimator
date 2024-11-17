const { calculateCharge } = require("../services/shippingService");

test("should calculate shipping charge correctly for aeroplane", async () => {
    const result = await calculateCharge(warehouseId, customerId, "express");
    expect(result).toBeGreaterThan(500); // Example validation
});
