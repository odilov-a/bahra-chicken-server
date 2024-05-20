const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware.js");
const uploadMiddleware = require("../middlewares/upload.middleware.js");
const productController = require("../controller/product.controller.js");
const productRoutes = Router();

productRoutes.get("/", productController.getAllProduct);
productRoutes.get("/:productId", productController.getProductById);
productRoutes.post("/", authMiddleware, uploadMiddleware, productController.createProduct);
productRoutes.put("/:productId", authMiddleware, uploadMiddleware, productController.updateProduct);
productRoutes.delete("/:productId", authMiddleware, productController.deleteProduct);

module.exports = productRoutes;