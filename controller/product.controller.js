const Product = require("../models/Product.js");
const pagination = require("../utils/pagination.js");
const filterByLang = require("../utils/filterByLang.js");

exports.getAllProduct = async (req, res) => {
  try {
    const products = await pagination(Product, req.query);
    if(req.query.lang == 'en') {
      req.query.lang = 'eng';
    }
    const filtered = filterByLang(
      products.data,
      req.query.lang,
      "title",
      "description",
      "type"
    );
    return res.json({
      data: filtered,
      pagination: products.pagination,
      _links: products._links,
      _meta: products._meta,
    });
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
    const { images, images02, images03 } = req;
    const newProductData = {
      ...req.body,
      image: images,
      image02: images02,
      image03: images03,
    };
    const newProduct = await Product.create(newProductData);
    return res.json({ data: newProduct });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    if (req.images.length > 0) {
      req.body.image = req.images;
    }
    if (req.images02.length > 0) {
      req.body.image02 = req.images02;
    }
    if (req.images03.length > 0) {
      req.body.image03 = req.images03;
    }
    const updateProduct = await Product.findByIdAndUpdate(
      req.params.productId,
      { ...req.body },
      { new: true }
    );
    if (!updateProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.json({ data: updateProduct });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(
      req.params.productId
    );
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.json({ message: "Product deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
