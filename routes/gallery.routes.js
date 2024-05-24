const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware.js");
const uploadMiddleware = require("../middlewares/upload.middleware.js");
const galleryController = require("../controller/gallery.controller.js");
const galleryRoutes = Router();

galleryRoutes.get("/", galleryController.getAllGallery);
galleryRoutes.get("/:galleryId", galleryController.getGalleryById);
galleryRoutes.post("/", authMiddleware, uploadMiddleware, galleryController.createGallery);
galleryRoutes.put("/:galleryId", authMiddleware, uploadMiddleware, galleryController.updateGallery);
galleryRoutes.delete("/:galleryId", authMiddleware, galleryController.deleteGallery);

module.exports = galleryRoutes;