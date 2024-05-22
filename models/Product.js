const mongoose = require("mongoose");
const CHICKENS_TYPE = ["unripe", "halfReady"];

const productSchame = new mongoose.Schema(
  {
    titleUz: {
      type: String,
      required: true,
    },
    descriptionUz: {
      type: String,
      required: true,
    },
    titleRu: {
      type: String,
      required: true,
    },
    descriptionRu: {
      type: String,
      required: true,
    },
    titleEng: {
      type: String,
      required: true,
    },
    descriptionEng: {
      type: String,
      required: true,
    },
    image: {
      type: Array,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: CHICKENS_TYPE,
    },
  },
  { timestamps: true }
);

const Products = mongoose.model("products", productSchame);
module.exports = Products;