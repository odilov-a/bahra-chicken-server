const Product = require("../models/Product.js");
const pagination = require("../utils/pagination.js")

exports.getAllProduct = async (req, res) => {
  try {
    const products = await pagination(Product, req.query);
    return res.json(products);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.json({ data: product });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    req.body.image = req.images;
    const newProduct = await Product.create({...req.body});
    return res.json({ data: newProduct });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const updateProduct = await Product.findById(req.params.productId);
    if (!updateProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    req.body.image = req.images;
    Object.assign(updateProduct, req.body)
    await updateProduct.save();
    return res.json({ data: updateProduct });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.productId);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.json({ message: "Product deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};