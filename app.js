require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const errorHandler = require("./utils/errorHandler");
const warehouseRoutes = require("./routes/warehouseRoutes");
const shippingRoutes = require("./routes/shippingRoutes");

const app = express();

connectDB();

app.use(express.json());
app.use("/api/v1/warehouse", warehouseRoutes);
app.use("/api/v1/shipping-charge", shippingRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
