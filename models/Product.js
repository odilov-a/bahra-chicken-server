const mongoose = require("mongoose");
const CHICKENS_TYPE_ENG = ["unripeEng", "halfReadyEng"];
const CHICKENS_TYPE_RU = ["unripeRu", "halfReadyRu"];
const CHICKENS_TYPE_UZ = ["unripeUz", "halfReadyUz"];

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
    image02: {
      type: Array,
    },
    image03: {
      type: Array,
    },
    price: {
      type: Number,
      required: true,
    },
    typeEng: {
      type: String,
      enum: CHICKENS_TYPE_ENG,
    },
    typeRu: {
      type: String,
      enum: CHICKENS_TYPE_RU,
    },
    typeUz: {
      type: String,
      enum: CHICKENS_TYPE_UZ,
    },
  },
  { timestamps: true }
);

const Products = mongoose.model("products", productSchame);
module.exports = Products;