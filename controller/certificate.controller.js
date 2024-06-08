const Certificate = require("../models/Certificate.js");
const pagination = require("../utils/pagination.js")

exports.getAllCertificate = async (req, res) => {
  try {
    const certificates = await pagination(Certificate, req.query);
    return res.json(certificates);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.getCertificateById = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.certificateId);
    if (!certificate) {
      return res.status(404).json({ message: "Certificate not found" });
    }
    return res.json({ data: certificate });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.createCertificate = async (req, res) => {
  try {
    req.body.image = req.images;
    const newCertificate = await Certificate.create({...req.body});
    return res.json({ data: newCertificate });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.updateCertificate = async (req, res) => {
  try {
    const updateCertificate = await Certificate.findById(req.params.certificateId);
    if (!updateCertificate) {
      return res.status(404).json({ message: "Certificate not found" });
    }
    if(req.images.length > 0) {
      req.body.image = req.images;
    }
    Object.assign(updateCertificate, req.body)
    await updateCertificate.save();
    return res.json({ data: updateCertificate });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.deleteCertificate = async (req, res) => {
  try {
    const deletedCertificate = await Certificate.findByIdAndDelete(req.params.certificateId);
    if (!deletedCertificate) {
      return res.status(404).json({ message: "Certificate not found" });
    }
    return res.json({ message: "Certificate deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};