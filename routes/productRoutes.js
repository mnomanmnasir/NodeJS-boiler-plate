const express = require("express");
const { addProduct, getUserProducts } = require("../controller/productController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/add", authMiddleware, addProduct);  // User can add product
router.get("/my-products", authMiddleware, getUserProducts); // Fetch logged-in user's products

module.exports = router;
