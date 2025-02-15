const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Product belongs to a user
});

module.exports = mongoose.model("Product", productSchema);
