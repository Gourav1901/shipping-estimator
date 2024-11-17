require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const warehouseRoutes = require("./routes/warehouseRoutes");
const shippingRoutes = require("./routes/shippingRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(express.json());
app.use("/api/v1/warehouse", warehouseRoutes);
app.use("/api/v1/shipping", shippingRoutes);


app.get("/", (req, res) => {
  res.send("Welcome to the Shipping Estimator API");
});

app.use(errorHandler);

const PORT = process.env.PORT || 8085;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on port ${PORT}`)
}
);
