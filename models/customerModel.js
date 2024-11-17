const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
 name:String,
 phone:String,
 location:{
  lat:Number,
  lng:Number,
 },
}); 

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
