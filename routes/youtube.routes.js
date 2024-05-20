const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware.js");
const youtubeController = require("../controller/youtube.controller.js");
const youtubeRoutes = Router();

youtubeRoutes.get("/", youtubeController.getAllYoutube);
youtubeRoutes.get("/:youtubeId", youtubeController.getYoutubeById);
youtubeRoutes.post("/", authMiddleware, youtubeController.createYoutube);
youtubeRoutes.put("/:youtubeId", authMiddleware, youtubeController.updateYoutube);
youtubeRoutes.delete("/:youtubeId", authMiddleware, youtubeController.deleteYoutube);

module.exports = youtubeRoutes;