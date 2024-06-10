const mongoose = require("mongoose");
// const CHICKENS_TYPE_ENG = ["Raw Chicken", "Half-ready food"];
// const CHICKENS_TYPE_RU = ["Сырые куриные", "Полуфабрикаты"];
// const CHICKENS_TYPE_UZ = ["Xom tovuq", "Yarim tayyor ovqat"];

const productSchema = new mongoose.Schema(
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
    type: {
      type: Number,
      required: true,
    }
  },
  { timestamps: true }
);

const Products = mongoose.model("products", productSchema);
module.exports = Products;