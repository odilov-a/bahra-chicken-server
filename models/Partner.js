const mongoose = require("mongoose");
const partnerSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Partners = mongoose.model("partners", partnerSchema);
module.exports = Partners;