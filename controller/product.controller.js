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
    // Extract image data from the request
    const { images, images02, images03 } = req;

    // Prepare the new product data
    const newProductData = {
      ...req.body,
      image: images,
      image02: images02,
      image03: images03,
    };

    // Create the new product
    const newProduct = await Product.create(newProductData);

    // Respond with the newly created product
    return res.json({ data: newProduct });
  } catch (err) {
    // Handle errors
    return res.status(500).json({ error: err.message });
  }
};

// exports.updateProduct = async (req, res) => {
//   try {
//     const updateProduct = await Product.findById(req.params.productId);
//     if (!updateProduct) {
//       return res.status(404).json({ message: "Product not found" });
//     }
//     req.body.image = req.images;
//     req.body.image02 = req.images02;
//     req.body.image03 = req.images03;
//     if (image.length !== 0) {
//       updateData.image = image;
//     }
//     if (image02.length !== 0) {
//       updateData.image02 = image02;
//     }
//     if (image03.length !== 0) {
//       updateData.image03 = image03;
//     }
//     Object.assign(updateProduct, req.body)
//     await updateProduct.save();
//     return res.json({ data: updateProduct });
//   } catch (err) {
//     return res.status(500).json({ error: err.message });
//   }
// };

exports.updateProduct = async (req, res) => {
  try {
    const updateProduct = await Product.findById(req.params.productId);
    if (!updateProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    const updateData = { ...req.body };
    if (req.images && req.images.length !== 0) {
      updateData.image = req.images;
    }
    if (req.images02 && req.images02.length !== 0) {
      updateData.image02 = req.images02;
    }
    if (req.images03 && req.images03.length !== 0) {
      updateData.image03 = req.images03;
    }
    Object.assign(updateProduct, updateData);
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