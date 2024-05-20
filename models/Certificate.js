const mongoose = require("mongoose");
const certificateSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Certificates = mongoose.model("certificates", certificateSchema);
module.exports = Certificates;