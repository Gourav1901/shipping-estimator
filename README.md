# Shipping Charge Estimator

A simple application that calculates shipping charges for a B2B e-commerce marketplace. The app uses warehouses, customers, and delivery parameters to compute charges.

---

## **Features**
- Find the nearest warehouse for a seller.
- Calculate shipping charges based on distance, transport mode, and delivery speed.
- Simple API routes for ease of testing.

---

## **System Requirements**
- **Operating System:** Windows/Mac/Linux
- **Node.js:** v16 or later (if not installed, instructions are provided below)
- **MongoDB:** Installed locally or use a MongoDB cloud instance

---


# Shipping Charge Estimator - API Documentation

This document describes the available API endpoints for the Shipping Charge Estimator application, along with examples to test them.

---

## Base URL
```

http://localhost:8085/api/v1

```


---

## 1. Find Nearest Warehouse

### Endpoint

```
GET /warehouse/nearest

```


### Description
This API finds the nearest warehouse to a seller based on the seller's location.

### Query Parameters
- `sellerLocation` (required): A JSON object containing the latitude (`lat`) and longitude (`lng`) of the seller.

### Example Request

```
GET /warehouse/nearest?sellerLocation={"lat":11.232,"lng":23.445495}
```

### 2. Calculate Shipping Charge ##
-Endpoint

```
GET /shipping/charge



```

## Description
-This API calculates the shipping charge for delivering a product from a warehouse to a customer.
- The calculation is based on the distance between the warehouse and the customer, transport mode, and delivery speed.

-Query Parameters
-warehouseId (required): The MongoDB ID of the warehouse.
-customerId (required): The MongoDB ID of the customer.
-deliverySpeed (required): The delivery speed, which can be either standard or express.

```
GET /shipping/charge?warehouseId=6739cf99befcec754b6424b9&customerId=6739d09bbefcec754b6424cd&deliverySpeed=express

```

## 3. Combined Shipping Calculation
-Endpoint 

```
POST /shipping/calculate


```
## Description
-This API finds the nearest warehouse for a seller and calculates the shipping charge for a specific customer.
-It combines the nearest warehouse retrieval and shipping charge calculation into one API call.

```
Request body
{
  "sellerId": "6739cf99befcec754b6424b1",
  "customerId": "6739d09bbefcec754b6424cd",
  "deliverySpeed": "express"
}


POST /shipping/calculate

response

{
  "shippingCharge": 202,
  "nearestWarehouse": {
    "warehouseId": "6739cf99befcec754b6424b9",
    "warehouseLocation": {
      "lat": 12.99999,
      "lng": 37.923273
    }
  }
}


```

## **Setup Instructions**

### **1. Install Node.js**
If Node.js is not installed, follow these steps:
1. **Download Node.js** from the [official website](https://nodejs.org/).
2. Install the LTS (Long Term Support) version for stability.
3. Verify installation:
   ```bash
   node -v
   npm -v


# Clone the Repository
# Run the following command to clone the repository:
      ``` git clone <repository-url>
          cd shipping-estimator
      ```

# Install Dependencies
 - After navigating to the project directory, install the required dependencies:
    npm install



