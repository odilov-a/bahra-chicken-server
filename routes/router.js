const { Router } = require("express");
const translationRoutes = require("./translation.routes.js");
const userRoutes = require("./user.routes.js");
const blogRoutes = require("./blog.routes.js");
const productRoutes = require("./product.routes.js");
const partnerRoutes = require("./partner.routes.js");
const youtubeRoutes = require("./youtube.routes.js");
const certificateRoutes = require("./certificate.routes.js");
const galleryRoutes = require("./gallery.routes.js");
const router = Router();

router.use("/translations", translationRoutes);
router.use("/users", userRoutes);
router.use("/blogs", blogRoutes);
router.use("/products", productRoutes);
router.use("/partners", partnerRoutes);
router.use("/youtubes", youtubeRoutes);
router.use("/certificates", certificateRoutes);
router.use("/galleries", galleryRoutes);

module.exports = router;