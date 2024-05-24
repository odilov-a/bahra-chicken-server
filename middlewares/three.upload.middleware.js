const multer = require("multer");
const path = require("path");
const sharp = require("sharp");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const storage = multer.memoryStorage();
const uploadMiddleware = multer({ storage: storage }).fields([
  { name: "image", maxCount: 5 },
  { name: "image02", maxCount: 5 },
  { name: "image03", maxCount: 5 },
]);
const outputPath = `${process.cwd()}/uploads/`;
const generateUUID = () => uuidv4();
const resizeAndSaveImage = async (file, filename, width, height) => {
  const imageBuffer = await sharp(file.buffer)
    .resize({ width, height, fit: "inside", withoutEnlargement: true })
    .toBuffer();
  fs.writeFileSync(`${outputPath}${filename}`, imageBuffer);
  return `${process.env.URL}${filename}`;
};

const uploadFile = (req, res, next) => {
  uploadMiddleware(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: "File upload error" });
    } else if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
    const { format = "webp" } = req.query;
    const files = {};
    const handleImageField = async (field) => {
      const images = [];
      if (req.files && req.files[field]) {
        for (let i = 0; i < req.files[field].length; i++) {
          const uniqueId = generateUUID();
          const filename = `${uniqueId}_${Date.now()}_${i}.${format.toLowerCase()}`;
          const largeFilename = `${filename}`;
          const mediumFilename = `${uniqueId}_${Date.now()}_${i}_medium.${format.toLowerCase()}`;
          const smallFilename = `${uniqueId}_${Date.now()}_${i}_small.${format.toLowerCase()}`;
          const largeURL = await resizeAndSaveImage(
            req.files[field][i],
            largeFilename,
            600,
            600
          );
          const mediumURL = await resizeAndSaveImage(
            req.files[field][i],
            mediumFilename,
            500,
            500
          );
          const smallURL = await resizeAndSaveImage(
            req.files[field][i],
            smallFilename,
            300,
            300
          );
          images.push({
            large: largeURL,
            medium: mediumURL,
            small: smallURL,
          });
        }
      }
      return images;
    };
    files.image = await handleImageField("image");
    files.image02 = await handleImageField("image02");
    files.image03 = await handleImageField("image03");
    req.images = files;
    next();
  });
};

module.exports = uploadFile;