const mongoose = require("mongoose");
const gallerySchema = new mongoose.Schema(
  {
    image: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

const Galleries = mongoose.model("galleries", gallerySchema);
module.exports = Galleries;