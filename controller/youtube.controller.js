const Youtube = require("../models/Youtube.js");
const pagination = require("../utils/pagination.js")

exports.getAllYoutube = async (req, res) => {
  try {
    const youtubes = await pagination(Youtube, req.query);
    return res.json(youtubes);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.getYoutubeById = async (req, res) => {
  try {
    const youtube = await Youtube.findById(req.params.youtubeId);
    if (!youtube) {
      return res.status(404).json({ message: "Youtube not found" });
    }
    return res.json({ data: youtube });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.createYoutube = async (req, res) => {
  try {
    const newYoutube = await Youtube.create({...req.body});
    return res.json({ data: newYoutube });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.updateYoutube = async (req, res) => {
  try {
    const updateYoutube = await Youtube.findById(req.params.youtubeId);
    if (!updateYoutube) {
      return res.status(404).json({ message: "Youtube not found" });
    }
    Object.assign(updateYoutube, req.body)
    return res.json({ data: updateYoutube });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.deleteYoutube = async (req, res) => {
  try {
    const deletedYoutube = await Youtube.findByIdAndDelete(req.params.youtubeId);
    if (!deletedYoutube) {
      return res.status(404).json({ message: "Youtube not found" });
    }
    return res.json({ message: "Youtube deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};