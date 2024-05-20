const Partner = require("../models/Partner.js");
const pagination = require("../utils/pagination.js")

exports.getAllPartner = async (req, res) => {
  try {
    const partners = await pagination(Partner, req.query);
    return res.json(partners);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.getPartnerById = async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.partnerId);
    if (!partner) {
      return res.status(404).json({ message: "Partner not found" });
    }
    return res.json({ data: partner });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.createPartner = async (req, res) => {
  try {
    req.body.image = req.images;
    const newPartner = await Partner.create({...req.body});
    return res.json({ data: newPartner });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.updatePartner = async (req, res) => {
  try {
    const updatePartner = await Partner.findById(req.params.partnerId);
    if (!updatePartner) {
      return res.status(404).json({ message: "Partner not found" });
    }
    req.body.image = req.images;
    Object.assign(updatePartner, req.body)
    await updatePartner.save();
    return res.json({ data: updatePartner });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.deletePartner = async (req, res) => {
  try {
    const deletedPartner = await Partner.findByIdAndDelete(req.params.partnerId);
    if (!deletedPartner) {
      return res.status(404).json({ message: "Partner not found" });
    }
    return res.json({ message: "Partner deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};