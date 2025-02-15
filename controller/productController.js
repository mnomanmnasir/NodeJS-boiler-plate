const Product = require("../models/Product");

// ✅ Add Product (Only Logged-in User Can Add)
const addProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const newProduct = new Product({
      name,
      price,
      description,
      userId: req.user.userId, // Associate product with logged-in user
    });

    await newProduct.save();
    res.status(201).json({ message: "Product Added", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Error adding product" });
  }
};

// ✅ Fetch Products (Only Logged-in User's Products)
const getUserProducts = async (req, res) => {
  try {
    const products = await Product.find({ userId: req.user.userId });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
};

module.exports = { addProduct, getUserProducts };
