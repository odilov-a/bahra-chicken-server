const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware.js");
const uploadMiddleware = require("../middlewares/upload.middleware.js");
const certificateController = require("../controller/certificate.controller.js");
const certificateRoutes = Router();

certificateRoutes.get("/", certificateController.getAllCertificate);
certificateRoutes.get("/:certificateId", certificateController.getCertificateById);
certificateRoutes.post("/", authMiddleware, uploadMiddleware, certificateController.createCertificate);
certificateRoutes.put("/:certificateId", authMiddleware, uploadMiddleware, certificateController.updateCertificate);
certificateRoutes.delete("/:certificateId", authMiddleware, certificateController.deleteCertificate);

module.exports = certificateRoutes;