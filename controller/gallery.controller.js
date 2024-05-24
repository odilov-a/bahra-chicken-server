const Gallery = require("../models/Gallery.js");
const pagination = require("../utils/pagination.js")

exports.getAllGallery = async (req, res) => {
  try {
    const galleries = await pagination(Gallery, req.query);
    return res.json(galleries);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.getGalleryById = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.galleryId);
    if (!gallery) {
      return res.status(404).json({ message: "Gallery not found" });
    }
    return res.json({ data: gallery });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.createGallery = async (req, res) => {
  try {
    req.body.image = req.images;
    const newGallery = await Gallery.create({...req.body});
    return res.json({ data: newGallery });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.updateGallery = async (req, res) => {
  try {
    const updateGallery = await Gallery.findById(req.params.galleryId);
    if (!updateGallery) {
      return res.status(404).json({ message: "Gallery not found" });
    }
    req.body.image = req.images;
    Object.assign(updateGallery, req.body)
    await updateGallery.save();
    return res.json({ data: updateGallery });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.deleteGallery = async (req, res) => {
  try {
    const deletedGallery = await Gallery.findByIdAndDelete(req.params.galleryId);
    if (!deletedGallery) {
      return res.status(404).json({ message: "Gallery not found" });
    }
    return res.json({ message: "Gallery deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};