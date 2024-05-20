const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware.js");
const uploadMiddleware = require("../middlewares/upload.middleware.js");
const partnerController = require("../controller/partner.controller.js");
const partnerRoutes = Router();

partnerRoutes.get("/", partnerController.getAllPartner);
partnerRoutes.get("/:partnerId", partnerController.getPartnerById);
partnerRoutes.post("/", authMiddleware, uploadMiddleware, partnerController.createPartner);
partnerRoutes.put("/:partnerId", authMiddleware, uploadMiddleware, partnerController.updatePartner);
partnerRoutes.delete("/:partnerId", authMiddleware, partnerController.deletePartner);

module.exports = partnerRoutes;